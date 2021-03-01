import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import MapView, {
  Callout,
  Camera,
  LatLng,
  MapEvent,
  Marker,
  Polygon,
  Region,
} from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { Feature, GeoJsonProperties, Point } from "geojson";
import * as actions from "../../redux/actions";
import { ErrorOverlay } from "../../common/components";
import { colors, customMapStyle } from "../../common/styles";
import { IMapBoundaries } from "../../common/interfaces";
import { MapContext } from "../../contexts";
import { RootState } from "../../redux/reducers";
import { CalloutView, MarkerView } from "./components";
import { initialMapBoundaries, initialRegion } from "./constants";
import { processResultSet } from "./helpers";
import { IMapScreen } from "./interfaces";

type Props = PropsFromRedux & IMapScreen;

const MapScreen = ({ error, navigation, route, setError }: Props) => {
  // state hooks
  const [cameraConfig, setCameraConfig] = useState<Camera | undefined>(
    undefined
  );
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [mapBoundaries, setMapBoundaries] = useState<IMapBoundaries>(
    initialMapBoundaries
  );

  // context hooks
  const {
    featuresDatabase,
    executeSql,
    feature,
    features,
    featuresCollectionRef,
    setFeature,
    setFeatures,
  } = useContext(MapContext);

  // ref hooks
  const mapRef = useRef<MapView>(null);

  // effect hooks
  useEffect(() => {
    // if (featuresDatabase && featuresCollectionRef) {
    //   dropFeaturesTable(featuresDatabase);
    //   createFeaturesTable(featuresDatabase, featuresCollectionRef);
    // }
    navigation.setOptions({ title: "TODO: DYNAMIC STATE NAME" });
  }, []);

  useEffect(() => {
    // return early if cameraConfig is undefined
    if (!cameraConfig) return;

    // TODO: DO SOMETHING WITH THE CAMERA CONFIGURATION?
  }, [cameraConfig]);

  useEffect(() => {
    // return early if mapBoundaries is undefined
    if (!mapBoundaries) return;

    // TODO: DO SOMETHING WITH THE MAP BOUNDARIES?
  }, [mapBoundaries]);

  useEffect(() => {
    // return early if mapRef is null
    if (!mapRef) return;

    // set current camera config
    mapRef.current
      ?.getCamera()
      .then((cameraConfig) => {
        setCameraConfig(cameraConfig);

        queryFeaturesTable(featuresDatabase!, mapBoundaries).then(
          (features) => {
            // update state
            setFeatures(features);
          }
        );
      })
      .catch((error) => {
        // TODO: HANDLE THIS ERroR
        console.log(error);
      });

    // set current map boundaries
    mapRef.current?.getMapBoundaries().then((mapBoundaries) => {
      setMapBoundaries(mapBoundaries);
    });
  }, [mapRef]);

  const handleMarkerPress = (event: MapEvent) => {
    // destructure event
    const {
      nativeEvent: { coordinate },
    } = event;

    // animate map to coordinate
    mapRef.current?.animateCamera(
      { center: coordinate, zoom: 12 },
      { duration: 666 }
    );
  };

  const handleRegionChange = (region: Region) => {
    // TODO: DO SOMETHING WHENEVER THE REGION CHANGES?
  };

  const handleRegionChangeComplete = async (region: Region) => {
    // get previous camera config
    const prevCameraConfig = cameraConfig;

    // get current camera config
    const currentCameraConfig = await mapRef.current?.getCamera();

    // update state
    setCameraConfig(currentCameraConfig);

    // get current map boundaries
    const currentMapBoundaries = await mapRef.current?.getMapBoundaries();

    // update state
    setMapBoundaries(currentMapBoundaries!);

    // query database
    const newFeatures = await queryFeaturesTable(
      featuresDatabase!,
      currentMapBoundaries
    );

    // compare zoom levels and requery database
    prevCameraConfig?.zoom === currentCameraConfig?.zoom
      ? mergeResultSet(newFeatures!)
      : resetResultSet(newFeatures!);
  };

  const createFeaturesTable = async (
    featuresDatabase: SQLite.WebSQLDatabase,
    featuresCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  ) => {
    try {
      const sqlStatement = `
        CREATE TABLE IF NOT EXISTS features (
          class TEXT,
          continent TEXT,
          country TEXT,
          county TEXT,
          feet INTEGER,
          id INTEGER,
          latitude REAL,
          longitude REAL,
          meters INTEGER,
          name TEXT,
          state TEXT
        );
      `;
      await executeSql!(featuresDatabase, sqlStatement, []);

      populateFeaturesTable(featuresDatabase, featuresCollectionRef);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const dropFeaturesTable = async (featuresDatabase: SQLite.WebSQLDatabase) => {
    try {
      await executeSql!(featuresDatabase, `DROP TABLE IF EXISTS features;`, []);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const populateFeaturesTable = async (
    featuresDatabase: SQLite.WebSQLDatabase,
    featuresCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  ) => {
    try {
      // retrieve data from firestore
      const snapshot = await featuresCollectionRef
        .where("properties.class", "==", "Summit")
        .get();

      // collect firestore documents
      const documents: firebase.firestore.DocumentData[] = [];
      snapshot.forEach((doc) => {
        // retrieve all document fields as an object
        // NOTE: data object is equivalent to a GeoJSON Feature object
        const document = doc.data();

        // add document id to feature properties
        document.properties.id = doc.id;

        // push document into documents array
        documents.push(document);
      });

      // wait for all database transactions to finish
      const sqlStatement = `
        INSERT INTO features (
          class,
          continent,
          country,
          county,
          feet,
          id,
          latitude,
          longitude,
          meters,
          name,
          state
        ) VALUES (
          ?,?,?,?,?,?,?,?,?,?,?
        );
      `;
      for (const document of documents) {
        // destructure properties from document
        const { properties } = document;

        // format arguments
        const args = [
          properties.class,
          properties.continent,
          properties.country,
          properties.county,
          properties.feet,
          properties.id,
          properties.latitude,
          properties.longitude,
          properties.meters,
          properties.name,
          properties.state,
        ];

        await executeSql!(featuresDatabase, sqlStatement, args);
      }

      // query features table
      queryFeaturesTable(featuresDatabase, mapBoundaries);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const queryFeaturesTable = async (
    featuresDatabase: SQLite.WebSQLDatabase,
    mapBoundaries: IMapBoundaries = initialMapBoundaries
  ) => {
    try {
      // start activity indicator
      setIsWaiting(true);

      // destructure map boundaries
      const northEast = mapBoundaries.northEast;
      const southWest = mapBoundaries.southWest;

      // destructure northeast coordinates
      const neLat = northEast?.latitude;
      const neLng = northEast?.longitude;

      // destructure southwest coordinates
      const swLat = southWest?.latitude;
      const swLng = southWest?.longitude;

      const sqlStatement = `
        SELECT *
        FROM features
        WHERE latitude < ${neLat}
        AND longitude < ${neLng}
        AND latitude > ${swLat}
        AND longitude > ${swLng}
        ORDER BY meters DESC
        LIMIT 64;
      `;
      const resultSet: any = await executeSql!(
        featuresDatabase,
        sqlStatement,
        []
      );
      console.log("resultSet.rows._array.length", resultSet.rows._array.length);

      // convert resultSet into GeoJSON FeatureCollection
      const { features } = processResultSet(resultSet);

      // stop activity indicator
      setIsWaiting(false);

      return features;
    } catch (error) {
      // stop activity indicator
      setIsWaiting(false);

      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const mergeResultSet = (newFeatures: Feature<Point, GeoJsonProperties>[]) => {
    // get previous features
    const prevFeatures = features;

    // create new Set of feature ids
    const prevFeatureIds = new Set(
      prevFeatures?.map((feature) => feature.properties?.id)
    );

    // merge and dedupe feature arrays
    const mergedFeatures = [
      ...prevFeatures!,
      ...newFeatures.filter(
        (feature) => !prevFeatureIds.has(feature.properties?.id)
      ),
    ];

    // update state
    setFeatures(mergedFeatures);
  };

  const resetResultSet = (newFeatures: Feature<Point, GeoJsonProperties>[]) => {
    // update state
    setFeatures(newFeatures);
  };

  const coloradoCounties = {
    type: "FeatureCollection",
    properties: { kind: "state", state: "CO" },
    features: [
      {
        type: "Feature",
        properties: { kind: "county", name: "Adams", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-103.7956, 40.0016],
                [-103.708, 40.0016],
                [-103.708, 39.7387],
                [-104.8307, 39.7387],
                [-104.8855, 39.7387],
                [-104.8581, 39.7661],
                [-104.7322, 39.7716],
                [-104.765, 39.8209],
                [-104.6226, 39.8264],
                [-104.6007, 39.8976],
                [-104.7048, 39.903],
                [-104.7322, 39.8976],
                [-104.7322, 39.8428],
                [-104.7924, 39.8428],
                [-104.7924, 39.799],
                [-105.0553, 39.7935],
                [-105.0553, 39.914],
                [-105.0553, 40.0016],
                [-104.1516, 40.0016],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Alamosa", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.707, 37.7506],
                [-105.4551, 37.7506],
                [-105.488, 37.5753],
                [-105.7454, 37.3563],
                [-106.0411, 37.3563],
                [-106.0411, 37.4001],
                [-106.0411, 37.7506],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Arapahoe", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-104.8307, 39.7387],
                [-103.708, 39.7387],
                [-103.708, 39.5689],
                [-103.7134, 39.5689],
                [-104.1954, 39.5635],
                [-104.661, 39.5635],
                [-104.9896, 39.5689],
                [-105.0498, 39.5635],
                [-105.0553, 39.6237],
                [-105.0553, 39.6292],
                [-105.0553, 39.6292],
                [-105.0279, 39.6292],
                [-105.006, 39.6785],
                [-104.8855, 39.6237],
                [-104.8472, 39.6566],
                [-104.9019, 39.6675],
                [-104.9019, 39.7004],
                [-104.8636, 39.6949],
                [-104.8855, 39.7387],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Archuleta", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.1311, 37.422],
                [-107.1311, 37.3946],
                [-106.7093, 37.4056],
                [-106.6765, 37.4056],
                [-106.6765, 37.2303],
                [-106.5998, 37.1974],
                [-106.5888, 37.1427],
                [-106.4738, 36.9948],
                [-107.4213, 37.0003],
                [-107.4816, 37.0003],
                [-107.4816, 37.422],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Baca", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-102.7495, 37.6411],
                [-102.043, 37.6465],
                [-102.043, 37.3891],
                [-102.043, 36.9948],
                [-103.0014, 37.0003],
                [-103.0836, 37.0003],
                [-103.0781, 37.6411],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Bent", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-102.744, 38.2654],
                [-102.7495, 37.6411],
                [-103.0781, 37.6411],
                [-103.4067, 37.6411],
                [-103.4013, 38.2654],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Boulder", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.3401, 40.259],
                [-105.0553, 40.2645],
                [-105.0553, 40.0016],
                [-105.0553, 39.914],
                [-105.0553, 39.914],
                [-105.4003, 39.914],
                [-105.4387, 39.9359],
                [-105.6742, 39.9304],
                [-105.6906, 40.0126],
                [-105.6413, 40.0345],
                [-105.6304, 40.1166],
                [-105.6797, 40.1878],
                [-105.6523, 40.259],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Chaffee", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-106.3752, 39.0541],
                [-106.189, 39.0541],
                [-106.1671, 38.9939],
                [-106.1069, 38.9884],
                [-106.1123, 38.9391],
                [-106.0302, 38.9446],
                [-105.9261, 38.8734],
                [-105.9426, 38.8515],
                [-105.9097, 38.8077],
                [-105.9699, 38.6926],
                [-105.9206, 38.6762],
                [-105.8768, 38.5995],
                [-105.9042, 38.5064],
                [-106.0083, 38.4462],
                [-106.2493, 38.4243],
                [-106.3424, 38.5064],
                [-106.3643, 38.616],
                [-106.4519, 38.6981],
                [-106.419, 38.7255],
                [-106.4136, 38.8241],
                [-106.3478, 38.8569],
                [-106.3259, 38.9117],
                [-106.4629, 38.9117],
                [-106.556, 38.9993],
                [-106.5998, 38.9993],
                [-106.5779, 39.0596],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Cheyenne", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-102.0485, 39.0486],
                [-102.043, 38.6981],
                [-102.043, 38.616],
                [-103.1712, 38.6105],
                [-103.1657, 39.0377],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Clear Creek", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.9261, 39.7004],
                [-105.8823, 39.7387],
                [-105.8878, 39.799],
                [-105.7618, 39.7935],
                [-105.6906, 39.8537],
                [-105.5756, 39.8209],
                [-105.5373, 39.7716],
                [-105.4003, 39.7497],
                [-105.4003, 39.5635],
                [-105.8275, 39.5635],
                [-105.7837, 39.6292],
                [-105.9097, 39.6621],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Conejos", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-106.5231, 37.4001],
                [-106.0411, 37.4001],
                [-106.0411, 37.3563],
                [-105.7454, 37.3563],
                [-105.729, 37.1536],
                [-105.7728, 37.0441],
                [-105.718, 36.9948],
                [-106.0083, 36.9948],
                [-106.4738, 36.9948],
                [-106.5888, 37.1427],
                [-106.5998, 37.1974],
                [-106.6765, 37.2303],
                [-106.6765, 37.4056],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Costilla", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.236, 37.6246],
                [-105.1867, 37.6137],
                [-105.2196, 37.5808],
                [-105.132, 37.411],
                [-105.1648, 37.3891],
                [-105.1539, 37.2905],
                [-105.1539, 36.9948],
                [-105.2196, 36.9948],
                [-105.718, 36.9948],
                [-105.7728, 37.0441],
                [-105.729, 37.1536],
                [-105.7454, 37.3563],
                [-105.488, 37.5753],
                [-105.2963, 37.6575],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Crowley", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-104.053, 38.5229],
                [-103.5053, 38.5174],
                [-103.4998, 38.2654],
                [-103.5108, 38.1723],
                [-103.6203, 38.1723],
                [-103.6203, 38.1121],
                [-104.0585, 38.1449],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Custer", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.7947, 38.2654],
                [-105.0498, 38.26],
                [-105.0498, 37.9149],
                [-105.0772, 37.9533],
                [-105.1265, 37.9533],
                [-105.1594, 38.0135],
                [-105.1867, 38.008],
                [-105.2853, 37.8985],
                [-105.3182, 37.9368],
                [-105.4113, 37.893],
                [-105.4715, 37.8985],
                [-105.5866, 37.9697],
                [-105.6687, 38.1504],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Delta", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.5144, 39.2129],
                [-107.5035, 39.2184],
                [-107.498, 38.6707],
                [-108.0019, 38.6707],
                [-108.3798, 38.6707],
                [-108.3798, 38.8296],
                [-108.1388, 38.9062],
                [-108.095, 38.9774],
                [-107.98, 39.0596],
                [-107.8595, 39.0815],
                [-107.7664, 39.0432],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Denver", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-104.7048, 39.903],
                [-104.6007, 39.8976],
                [-104.6226, 39.8264],
                [-104.765, 39.8209],
                [-104.7322, 39.7716],
                [-104.8581, 39.7661],
                [-104.8855, 39.7387],
                [-104.8636, 39.6949],
                [-104.9019, 39.7004],
                [-104.9019, 39.6675],
                [-104.8472, 39.6566],
                [-104.8855, 39.6237],
                [-105.006, 39.6785],
                [-105.0279, 39.6292],
                [-105.0553, 39.6292],
                [-105.0553, 39.6292],
                [-105.0553, 39.6237],
                [-105.1101, 39.6292],
                [-105.0553, 39.6511],
                [-105.0827, 39.6675],
                [-105.0553, 39.6675],
                [-105.0553, 39.7935],
                [-104.7924, 39.799],
                [-104.7924, 39.8428],
                [-104.7322, 39.8428],
                [-104.7322, 39.8976],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Dolores", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-109.0425, 37.8821],
                [-108.2538, 37.893],
                [-108.21, 37.8218],
                [-107.9909, 37.8547],
                [-107.8595, 37.778],
                [-107.8759, 37.7177],
                [-107.969, 37.6958],
                [-107.9745, 37.6411],
                [-108.9165, 37.6301],
                [-109.0425, 37.4822],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Douglas", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-104.9896, 39.5689],
                [-104.661, 39.5635],
                [-104.661, 39.1308],
                [-104.995, 39.1308],
                [-105.0334, 39.1308],
                [-105.3291, 39.1308],
                [-105.2196, 39.2622],
                [-105.1703, 39.4046],
                [-105.121, 39.432],
                [-105.1374, 39.4704],
                [-105.0498, 39.5635],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Eagle", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-106.6272, 39.9249],
                [-106.4355, 39.9249],
                [-106.3862, 39.7661],
                [-106.1781, 39.6401],
                [-106.2109, 39.5306],
                [-106.2547, 39.5306],
                [-106.2054, 39.3773],
                [-106.2821, 39.3499],
                [-106.4026, 39.3827],
                [-106.4245, 39.3608],
                [-107.0434, 39.3663],
                [-107.1146, 39.3663],
                [-107.1146, 39.9195],
                [-107.0325, 39.9195],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "El Paso", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-104.995, 39.1308],
                [-104.661, 39.1308],
                [-104.053, 39.1308],
                [-104.053, 38.8679],
                [-104.053, 38.5229],
                [-104.9403, 38.5174],
                [-104.9403, 38.6488],
                [-104.9403, 38.7967],
                [-105.0717, 38.7967],
                [-105.0662, 38.8679],
                [-105.0279, 38.8679],
                [-105.0334, 39.1308],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Elbert", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-104.1954, 39.5635],
                [-103.7134, 39.5689],
                [-103.7189, 38.8679],
                [-104.053, 38.8679],
                [-104.053, 39.1308],
                [-104.661, 39.1308],
                [-104.661, 39.5635],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Fremont", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.3291, 38.6981],
                [-105.236, 38.6981],
                [-105.2415, 38.6488],
                [-104.9403, 38.6488],
                [-104.9403, 38.5174],
                [-104.9403, 38.26],
                [-105.0498, 38.26],
                [-105.7947, 38.2654],
                [-106.0083, 38.4462],
                [-105.9042, 38.5064],
                [-105.8768, 38.5995],
                [-105.9206, 38.6762],
                [-105.9699, 38.6926],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Garfield", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.0379, 40.0893],
                [-107.0325, 39.9195],
                [-107.1146, 39.9195],
                [-107.1146, 39.3663],
                [-107.4323, 39.3663],
                [-108.7741, 39.3663],
                [-109.0535, 39.3663],
                [-109.0535, 39.4977],
                [-109.0535, 39.6621],
                [-108.5551, 39.6511],
                [-108.5551, 39.6949],
                [-107.9362, 39.6949],
                [-107.9362, 39.8264],
                [-107.4323, 39.8264],
                [-107.4323, 39.9195],
                [-107.3173, 39.914],
                [-107.3173, 40.0893],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Gilpin", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.6742, 39.9304],
                [-105.4387, 39.9359],
                [-105.4003, 39.914],
                [-105.4003, 39.7497],
                [-105.5373, 39.7716],
                [-105.5756, 39.8209],
                [-105.6906, 39.8537],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Grand", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.8549, 40.4836],
                [-105.8056, 40.4726],
                [-105.7892, 40.3795],
                [-105.6523, 40.259],
                [-105.6797, 40.1878],
                [-105.6304, 40.1166],
                [-105.6413, 40.0345],
                [-105.6906, 40.0126],
                [-105.6742, 39.9304],
                [-105.6906, 39.8537],
                [-105.7618, 39.7935],
                [-105.8878, 39.799],
                [-105.8823, 39.7387],
                [-105.9261, 39.7004],
                [-106.0247, 39.6894],
                [-106.085, 39.8045],
                [-106.2493, 39.914],
                [-106.4355, 39.9249],
                [-106.6272, 39.9249],
                [-106.6546, 40.4453],
                [-106.5998, 40.3741],
                [-106.5341, 40.3631],
                [-106.4902, 40.4124],
                [-106.441, 40.3467],
                [-106.3533, 40.3576],
                [-106.304, 40.3302],
                [-106.2657, 40.3631],
                [-106.1945, 40.3248],
                [-106.0192, 40.3741],
                [-105.959, 40.3467],
                [-105.9042, 40.4014],
                [-105.8933, 40.4781],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Gunnison", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.5035, 39.2184],
                [-107.3939, 39.2568],
                [-107.3775, 39.1965],
                [-107.2844, 39.1198],
                [-107.0653, 39.1198],
                [-106.9887, 39.0705],
                [-106.9941, 39.0322],
                [-106.9065, 38.9939],
                [-106.8627, 39.0103],
                [-106.8024, 38.9774],
                [-106.7038, 39.0541],
                [-106.5998, 38.9993],
                [-106.556, 38.9993],
                [-106.4629, 38.9117],
                [-106.3259, 38.9117],
                [-106.3478, 38.8569],
                [-106.4136, 38.8241],
                [-106.419, 38.7255],
                [-106.4519, 38.6981],
                [-106.3643, 38.616],
                [-106.3424, 38.5064],
                [-106.2493, 38.4243],
                [-106.9996, 38.4243],
                [-106.9996, 38.1449],
                [-107.5692, 38.1449],
                [-107.5802, 38.2326],
                [-107.6349, 38.3038],
                [-107.498, 38.3038],
                [-107.498, 38.6707],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Hinsdale", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-106.9996, 38.1449],
                [-106.9996, 37.9587],
                [-107.1037, 37.9533],
                [-107.1365, 37.9368],
                [-107.1311, 37.422],
                [-107.4816, 37.422],
                [-107.4816, 37.6411],
                [-107.4597, 37.7944],
                [-107.5144, 37.8273],
                [-107.5309, 37.9423],
                [-107.5692, 37.9642],
                [-107.5911, 37.9916],
                [-107.5473, 38.0025],
                [-107.509, 38.0628],
                [-107.5583, 38.0902],
                [-107.5692, 38.1449],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Huerfano", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.1867, 38.008],
                [-105.1594, 38.0135],
                [-105.1265, 37.9533],
                [-105.0772, 37.9533],
                [-105.0498, 37.9149],
                [-105.0115, 37.8821],
                [-104.6445, 37.8985],
                [-104.3488, 37.8163],
                [-104.4583, 37.7506],
                [-104.5459, 37.5753],
                [-104.6883, 37.4932],
                [-104.6938, 37.4384],
                [-104.7486, 37.4056],
                [-104.9512, 37.3891],
                [-105.1539, 37.2905],
                [-105.1648, 37.3891],
                [-105.132, 37.411],
                [-105.2196, 37.5808],
                [-105.1867, 37.6137],
                [-105.236, 37.6246],
                [-105.2963, 37.6575],
                [-105.488, 37.5753],
                [-105.4551, 37.7506],
                [-105.4277, 37.8492],
                [-105.4715, 37.8985],
                [-105.4113, 37.893],
                [-105.3182, 37.9368],
                [-105.2853, 37.8985],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Jackson", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-106.8572, 41.0039],
                [-106.3205, 40.9984],
                [-106.189, 40.9984],
                [-106.1835, 40.9327],
                [-106.0302, 40.7848],
                [-105.9097, 40.5219],
                [-105.8714, 40.5219],
                [-105.8549, 40.4836],
                [-105.8933, 40.4781],
                [-105.9042, 40.4014],
                [-105.959, 40.3467],
                [-106.0192, 40.3741],
                [-106.1945, 40.3248],
                [-106.2657, 40.3631],
                [-106.304, 40.3302],
                [-106.3533, 40.3576],
                [-106.441, 40.3467],
                [-106.4902, 40.4124],
                [-106.5341, 40.3631],
                [-106.5998, 40.3741],
                [-106.6546, 40.4453],
                [-106.7038, 40.615],
                [-106.6381, 40.8177],
                [-106.6874, 40.8834],
                [-106.7367, 40.8725],
                [-106.8517, 40.9272],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Jefferson", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.0553, 39.914],
                [-105.0553, 39.914],
                [-105.0553, 39.7935],
                [-105.0553, 39.6675],
                [-105.0827, 39.6675],
                [-105.0553, 39.6511],
                [-105.1101, 39.6292],
                [-105.0553, 39.6237],
                [-105.0498, 39.5635],
                [-105.1374, 39.4704],
                [-105.121, 39.432],
                [-105.1703, 39.4046],
                [-105.2196, 39.2622],
                [-105.3291, 39.1308],
                [-105.3291, 39.1308],
                [-105.4003, 39.1308],
                [-105.4003, 39.5635],
                [-105.4003, 39.7497],
                [-105.4003, 39.914],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Kiowa", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-102.043, 38.616],
                [-102.043, 38.2709],
                [-102.2128, 38.2654],
                [-102.744, 38.2654],
                [-103.4013, 38.2654],
                [-103.4998, 38.2654],
                [-103.5053, 38.5174],
                [-103.1712, 38.5229],
                [-103.1712, 38.6105],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Kit Carson", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-102.4264, 39.5689],
                [-102.0485, 39.5744],
                [-102.0485, 39.5689],
                [-102.0485, 39.1308],
                [-102.0485, 39.0486],
                [-103.1657, 39.0377],
                [-103.1548, 39.5635],
                [-102.8043, 39.5689],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "La Plata", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.8047, 37.6411],
                [-107.4816, 37.6411],
                [-107.4816, 37.422],
                [-107.4816, 37.0003],
                [-108.3798, 37.0003],
                [-108.2922, 37.1481],
                [-108.2922, 37.2248],
                [-108.1991, 37.3563],
                [-108.1059, 37.3836],
                [-108.0786, 37.4384],
                [-108.0457, 37.4439],
                [-108.0238, 37.5863],
                [-107.9745, 37.6411],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Lake", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-106.1342, 39.3773],
                [-106.1507, 39.3225],
                [-106.1835, 39.3115],
                [-106.1726, 39.1363],
                [-106.2109, 39.1034],
                [-106.1671, 39.087],
                [-106.189, 39.0541],
                [-106.3752, 39.0541],
                [-106.5779, 39.0596],
                [-106.5614, 39.1582],
                [-106.5122, 39.1637],
                [-106.4957, 39.1965],
                [-106.5012, 39.3006],
                [-106.43, 39.317],
                [-106.4245, 39.3608],
                [-106.4026, 39.3827],
                [-106.2821, 39.3499],
                [-106.2054, 39.3773],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Larimer", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.2798, 40.9984],
                [-104.9458, 40.9984],
                [-104.9458, 40.3467],
                [-105.0553, 40.3467],
                [-105.0553, 40.2645],
                [-105.3401, 40.259],
                [-105.6523, 40.259],
                [-105.7892, 40.3795],
                [-105.8056, 40.4726],
                [-105.8549, 40.4836],
                [-105.8714, 40.5219],
                [-105.9097, 40.5219],
                [-106.0302, 40.7848],
                [-106.1835, 40.9327],
                [-106.189, 40.9984],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Las Animas", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-104.3488, 37.8163],
                [-104.0585, 37.7342],
                [-104.0585, 37.6465],
                [-103.4067, 37.6411],
                [-103.0781, 37.6411],
                [-103.0836, 37.0003],
                [-104.0092, 36.9948],
                [-105.1539, 36.9948],
                [-105.1539, 37.2905],
                [-104.9512, 37.3891],
                [-104.7486, 37.4056],
                [-104.6938, 37.4384],
                [-104.6883, 37.4932],
                [-104.5459, 37.5753],
                [-104.4583, 37.7506],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Lincoln", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-103.7134, 39.5689],
                [-103.708, 39.5689],
                [-103.1548, 39.5635],
                [-103.1657, 39.0377],
                [-103.1712, 38.6105],
                [-103.1712, 38.5229],
                [-103.5053, 38.5174],
                [-104.053, 38.5229],
                [-104.053, 38.8679],
                [-103.7189, 38.8679],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Logan", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-102.6509, 41.0039],
                [-102.6509, 40.752],
                [-102.6673, 40.4398],
                [-102.7824, 40.4398],
                [-103.467, 40.4343],
                [-103.467, 40.5219],
                [-103.582, 40.5219],
                [-103.5765, 41.0039],
                [-103.3848, 41.0039],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Mesa", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-108.7741, 39.3663],
                [-107.4323, 39.3663],
                [-107.4651, 39.3225],
                [-107.3994, 39.2951],
                [-107.3939, 39.2568],
                [-107.5035, 39.2184],
                [-107.5144, 39.2129],
                [-107.7664, 39.0432],
                [-107.8595, 39.0815],
                [-107.98, 39.0596],
                [-108.095, 38.9774],
                [-108.1388, 38.9062],
                [-108.3798, 38.8296],
                [-108.3798, 38.6707],
                [-108.3798, 38.5009],
                [-109.0589, 38.5009],
                [-109.0535, 39.3663],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Mineral", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.1037, 37.9533],
                [-106.9996, 37.9587],
                [-106.8791, 37.9642],
                [-106.8463, 37.9204],
                [-106.6984, 37.8766],
                [-106.6929, 37.8328],
                [-106.7093, 37.4056],
                [-107.1311, 37.3946],
                [-107.1311, 37.422],
                [-107.1365, 37.9368],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Moffat", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.9197, 41.0039],
                [-107.3173, 41.0039],
                [-107.3118, 40.5986],
                [-107.372, 40.5986],
                [-107.372, 40.5438],
                [-107.4268, 40.5438],
                [-107.4378, 40.2207],
                [-109.0535, 40.2207],
                [-109.048, 40.6534],
                [-109.048, 40.9984],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Montezuma", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.9745, 37.6411],
                [-108.0238, 37.5863],
                [-108.0457, 37.4439],
                [-108.0786, 37.4384],
                [-108.1059, 37.3836],
                [-108.1991, 37.3563],
                [-108.2922, 37.2248],
                [-108.2922, 37.1481],
                [-108.3798, 37.0003],
                [-109.0425, 37.0003],
                [-109.0425, 37.4822],
                [-108.9165, 37.6301],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Montrose", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-108.0019, 38.6707],
                [-107.498, 38.6707],
                [-107.498, 38.3038],
                [-107.6349, 38.3038],
                [-107.6349, 38.3312],
                [-108.1333, 38.3312],
                [-108.084, 38.2545],
                [-107.9362, 38.2216],
                [-107.9635, 38.1504],
                [-109.0425, 38.1504],
                [-109.0589, 38.5009],
                [-108.3798, 38.5009],
                [-108.3798, 38.6707],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Morgan", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-104.0913, 40.5219],
                [-103.582, 40.5219],
                [-103.467, 40.5219],
                [-103.467, 40.4343],
                [-103.4725, 40.0016],
                [-103.708, 40.0016],
                [-103.7956, 40.0016],
                [-104.1516, 40.0016],
                [-104.1461, 40.5219],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Otero", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-103.4013, 38.2654],
                [-103.4067, 37.6411],
                [-104.0585, 37.6465],
                [-104.0585, 37.7342],
                [-104.0585, 38.1449],
                [-103.6203, 38.1121],
                [-103.6203, 38.1723],
                [-103.5108, 38.1723],
                [-103.4998, 38.2654],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Ouray", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.6349, 38.3038],
                [-107.5802, 38.2326],
                [-107.5692, 38.1449],
                [-107.5583, 38.0902],
                [-107.509, 38.0628],
                [-107.5473, 38.0025],
                [-107.5911, 37.9916],
                [-107.5692, 37.9642],
                [-107.6404, 37.9642],
                [-107.6623, 37.904],
                [-107.739, 37.904],
                [-107.7938, 37.9861],
                [-107.8923, 38.0135],
                [-107.8923, 38.1176],
                [-107.9526, 38.1176],
                [-107.9635, 38.1504],
                [-107.9362, 38.2216],
                [-108.084, 38.2545],
                [-108.1333, 38.3312],
                [-107.6349, 38.3312],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Park", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.8275, 39.5635],
                [-105.4003, 39.5635],
                [-105.4003, 39.1308],
                [-105.3291, 39.1308],
                [-105.3291, 38.6981],
                [-105.9699, 38.6926],
                [-105.9097, 38.8077],
                [-105.9426, 38.8515],
                [-105.9261, 38.8734],
                [-106.0302, 38.9446],
                [-106.1123, 38.9391],
                [-106.1069, 38.9884],
                [-106.1671, 38.9939],
                [-106.189, 39.0541],
                [-106.1671, 39.087],
                [-106.2109, 39.1034],
                [-106.1726, 39.1363],
                [-106.1835, 39.3115],
                [-106.1507, 39.3225],
                [-106.1342, 39.3773],
                [-106.0192, 39.3608],
                [-105.8604, 39.5306],
                [-105.8221, 39.5306],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Phillips", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-102.3278, 40.7465],
                [-102.0539, 40.752],
                [-102.0539, 40.6972],
                [-102.0539, 40.4398],
                [-102.4264, 40.4398],
                [-102.6673, 40.4398],
                [-102.6509, 40.752],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Pitkin", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.0434, 39.3663],
                [-106.4245, 39.3608],
                [-106.43, 39.317],
                [-106.5012, 39.3006],
                [-106.4957, 39.1965],
                [-106.5122, 39.1637],
                [-106.5614, 39.1582],
                [-106.5779, 39.0596],
                [-106.5998, 38.9993],
                [-106.7038, 39.0541],
                [-106.8024, 38.9774],
                [-106.8627, 39.0103],
                [-106.9065, 38.9939],
                [-106.9941, 39.0322],
                [-106.9887, 39.0705],
                [-107.0653, 39.1198],
                [-107.2844, 39.1198],
                [-107.3775, 39.1965],
                [-107.3939, 39.2568],
                [-107.3994, 39.2951],
                [-107.4651, 39.3225],
                [-107.4323, 39.3663],
                [-107.1146, 39.3663],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Prowers", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-102.2128, 38.2654],
                [-102.043, 38.2709],
                [-102.043, 38.26],
                [-102.043, 37.7396],
                [-102.043, 37.6465],
                [-102.7495, 37.6411],
                [-102.744, 38.2654],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Pueblo", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-104.053, 38.5229],
                [-104.0585, 38.1449],
                [-104.0585, 37.7342],
                [-104.3488, 37.8163],
                [-104.6445, 37.8985],
                [-105.0115, 37.8821],
                [-105.0498, 37.9149],
                [-105.0498, 38.26],
                [-104.9403, 38.26],
                [-104.9403, 38.5174],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Rio Blanco", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.1091, 40.2262],
                [-107.0379, 40.2262],
                [-107.0379, 40.0893],
                [-107.3173, 40.0893],
                [-107.3173, 39.914],
                [-107.4323, 39.9195],
                [-107.4323, 39.8264],
                [-107.9362, 39.8264],
                [-107.9362, 39.6949],
                [-108.5551, 39.6949],
                [-108.5551, 39.6511],
                [-109.0535, 39.6621],
                [-109.0535, 40.2207],
                [-107.4378, 40.2207],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Rio Grande", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-106.6929, 37.8328],
                [-106.5888, 37.8328],
                [-106.5888, 37.7451],
                [-106.0411, 37.7506],
                [-106.0411, 37.4001],
                [-106.5231, 37.4001],
                [-106.6765, 37.4056],
                [-106.7093, 37.4056],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Routt", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.3173, 41.0039],
                [-106.8572, 41.0039],
                [-106.8517, 40.9272],
                [-106.7367, 40.8725],
                [-106.6874, 40.8834],
                [-106.6381, 40.8177],
                [-106.7038, 40.615],
                [-106.6546, 40.4453],
                [-106.6272, 39.9249],
                [-107.0325, 39.9195],
                [-107.0379, 40.0893],
                [-107.0379, 40.2262],
                [-107.1091, 40.2262],
                [-107.4378, 40.2207],
                [-107.4268, 40.5438],
                [-107.372, 40.5438],
                [-107.372, 40.5986],
                [-107.3118, 40.5986],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Saguache", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-106.0083, 38.4462],
                [-105.7947, 38.2654],
                [-105.6687, 38.1504],
                [-105.5866, 37.9697],
                [-105.4715, 37.8985],
                [-105.4277, 37.8492],
                [-105.4551, 37.7506],
                [-105.707, 37.7506],
                [-106.0411, 37.7506],
                [-106.5888, 37.7451],
                [-106.5888, 37.8328],
                [-106.6929, 37.8328],
                [-106.6984, 37.8766],
                [-106.8463, 37.9204],
                [-106.8791, 37.9642],
                [-106.9996, 37.9587],
                [-106.9996, 38.1449],
                [-106.9996, 38.4243],
                [-106.2493, 38.4243],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "San Juan", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-107.5692, 37.9642],
                [-107.5309, 37.9423],
                [-107.5144, 37.8273],
                [-107.4597, 37.7944],
                [-107.4816, 37.6411],
                [-107.8047, 37.6411],
                [-107.9745, 37.6411],
                [-107.969, 37.6958],
                [-107.8759, 37.7177],
                [-107.8595, 37.778],
                [-107.739, 37.904],
                [-107.6623, 37.904],
                [-107.6404, 37.9642],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "San Miguel", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-109.0425, 38.1504],
                [-107.9635, 38.1504],
                [-107.9526, 38.1176],
                [-107.8923, 38.1176],
                [-107.8923, 38.0135],
                [-107.7938, 37.9861],
                [-107.739, 37.904],
                [-107.8595, 37.778],
                [-107.9909, 37.8547],
                [-108.21, 37.8218],
                [-108.2538, 37.893],
                [-109.0425, 37.8821],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Sedgwick", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-102.6235, 41.0039],
                [-102.0539, 41.0039],
                [-102.0539, 40.752],
                [-102.3278, 40.7465],
                [-102.6509, 40.752],
                [-102.6509, 41.0039],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Summit", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-106.4355, 39.9249],
                [-106.2493, 39.914],
                [-106.085, 39.8045],
                [-106.0247, 39.6894],
                [-105.9261, 39.7004],
                [-105.9097, 39.6621],
                [-105.7837, 39.6292],
                [-105.8275, 39.5635],
                [-105.8221, 39.5306],
                [-105.8604, 39.5306],
                [-106.0192, 39.3608],
                [-106.1342, 39.3773],
                [-106.2054, 39.3773],
                [-106.2547, 39.5306],
                [-106.2109, 39.5306],
                [-106.1781, 39.6401],
                [-106.3862, 39.7661],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Teller", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-105.3291, 39.1308],
                [-105.3291, 39.1308],
                [-105.0334, 39.1308],
                [-105.0279, 38.8679],
                [-105.0662, 38.8679],
                [-105.0717, 38.7967],
                [-104.9403, 38.7967],
                [-104.9403, 38.6488],
                [-105.2415, 38.6488],
                [-105.236, 38.6981],
                [-105.3291, 38.6981],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Washington", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-102.7824, 40.4398],
                [-102.8043, 39.5689],
                [-103.1548, 39.5635],
                [-103.708, 39.5689],
                [-103.708, 39.7387],
                [-103.708, 40.0016],
                [-103.4725, 40.0016],
                [-103.467, 40.4343],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Weld", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-103.5765, 41.0039],
                [-103.582, 40.5219],
                [-104.0913, 40.5219],
                [-104.1461, 40.5219],
                [-104.1516, 40.0016],
                [-105.0553, 40.0016],
                [-105.0553, 40.2645],
                [-105.0553, 40.3467],
                [-104.9458, 40.3467],
                [-104.9458, 40.9984],
                [-104.053, 41.0039],
              ],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { kind: "county", name: "Yuma", state: "CO" },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-102.4264, 40.4398],
                [-102.0539, 40.4398],
                [-102.0539, 40.3467],
                [-102.0539, 40.0016],
                [-102.0485, 39.5744],
                [-102.4264, 39.5689],
                [-102.8043, 39.5689],
                [-102.7824, 40.4398],
                [-102.6673, 40.4398],
              ],
            ],
          ],
        },
      },
    ],
  };

  const polygonCoordiantes = coloradoCounties.features.map((feature) => {
    // destructure feature
    const {
      geometry: { coordinates },
    } = feature;

    // destructure coordinates
    const [[polygonCoordiantes]] = coordinates;

    // cap polygon by pushing first coordinate
    polygonCoordiantes.push(polygonCoordiantes[0]);

    return polygonCoordiantes.map((coordinate) => ({
      latitude: coordinate[1],
      longitude: coordinate[0],
    }));
  });

  // {
  //   type: "FeatureCollection",
  //   properties: { kind: "state", state: "CO" },
  //   features: [
  //     {
  //       type: "Feature",
  //       properties: { kind: "county", name: "Boulder", state: "CO" },
  //       geometry: {
  //         type: "MultiPolygon",
  //         coordinates: [
  //           [
  //             [
  //               [-105.3401, 40.259],
  //               [-105.0553, 40.2645],
  //               [-105.0553, 40.0016],
  //               [-105.0553, 39.914],
  //               [-105.0553, 39.914],
  //               [-105.4003, 39.914],
  //               [-105.4387, 39.9359],
  //               [-105.6742, 39.9304],
  //               [-105.6906, 40.0126],
  //               [-105.6413, 40.0345],
  //               [-105.6304, 40.1166],
  //               [-105.6797, 40.1878],
  //               [-105.6523, 40.259],
  //               [-105.3401, 40.259],
  //             ],
  //           ],
  //         ],
  //       },
  //     },
  //   ],
  // };

  // const coordinates: LatLng[] = polyline.features[0].geometry.coordinates[0][0].map(
  //   (coordinate) => {
  //     return {
  //       latitude: coordinate[1],
  //       longitude: coordinate[0],
  //     };
  //   }
  // );

  // console.log(coordinates);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ErrorOverlay error={error} />
      {isWaiting && (
        <ActivityIndicator
          color={colors.black25}
          size="large"
          style={styles.activityIndicator}
        />
      )}
      <MapView
        customMapStyle={customMapStyle}
        initialRegion={initialRegion}
        loadingEnabled={true}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        pitchEnabled={false}
        provider={"google"}
        ref={mapRef}
        style={styles.map}
      >
        {features?.map((feature) => {
          // destructure feature
          const geometry = feature.geometry;
          const properties = feature.properties;

          // destructure geometry
          const coordinates = (geometry as Point).coordinates;

          // format marker coordinate
          const coordinate: LatLng = {
            latitude: coordinates[1],
            longitude: coordinates[0],
          };

          return (
            <Marker
              key={properties!.id}
              coordinate={coordinate}
              onPress={handleMarkerPress}
              tracksViewChanges={false}
            >
              <MarkerView properties={properties} />
              <Callout
                onPress={() =>
                  navigation.navigate("Feature", { name: properties?.name })
                }
              >
                <CalloutView properties={properties} />
              </Callout>
            </Marker>
          );
        })}
        {polygonCoordiantes.map((coordiantes, index) => (
          <Polygon
            coordinates={coordiantes}
            fillColor={colors.queenBlue25}
            key={index}
            strokeColor={colors.queenBlue75}
          ></Polygon>
        ))}
      </MapView>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = { setError: actions.setError };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MapScreen);

const styles = StyleSheet.create({
  activityIndicator: {
    position: "absolute",
    zIndex: 1,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

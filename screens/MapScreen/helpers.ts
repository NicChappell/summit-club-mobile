import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  MultiPolygon,
  Point,
} from "geojson";
import { LatLng } from "react-native-maps";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import * as helpers from "@turf/helpers";
import { executeSql } from "../../common/helpers";
import {
  IError,
  IMapBoundaries,
  IFeatureFilters,
  ISQLResult,
} from "../../common/interfaces";
import { initialMapBoundaries } from "./constants";

export const countFeatureRows = async (
  featuresDatabase: SQLite.WebSQLDatabase,
  featureFilters: IFeatureFilters,
  setError: (error: IError) => void
) => {
  try {
    // construct sql statement
    const sqlStatement = `
      SELECT COUNT(*)
      FROM features
      WHERE (
        feet <= ${featureFilters.maxElevation}
      ) AND (
        ${featureFilters.above14 ? "(feet >= 14000)" : "(feet <= 14000)"}
        ) OR (
        ${
          featureFilters.between13and14
            ? "(feet BETWEEN 13000 AND 14000)"
            : "(feet NOT BETWEEN 13000 AND 14000)"
        }
        ) OR (
        ${
          featureFilters.between12and13
            ? "(feet BETWEEN 12000 AND 13000)"
            : "(feet NOT BETWEEN 12000 AND 13000)"
        }
        ) OR (
        ${
          featureFilters.between11and12
            ? "(feet BETWEEN 11000 AND 12000)"
            : "(feet NOT BETWEEN 11000 AND 12000)"
        }
        ) OR (
        ${
          featureFilters.between10and11
            ? "(feet BETWEEN 10000 AND 11000)"
            : "(feet NOT BETWEEN 10000 AND 11000)"
        }
        ) OR (
        ${featureFilters.below10 ? "(feet <= 10000)" : "(feet >= 10000)"}
      );
    `;
    const resultSet = await executeSql!(featuresDatabase, sqlStatement, []);
    console.log("resultSet.rows._array: ", resultSet.rows._array);
  } catch (error) {
    setError({
      code: error.code,
      message: error.message,
    });
  }
};

export const createFeaturesTable = async (
  featuresDatabase: SQLite.WebSQLDatabase,
  featuresCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  populateFeaturesTable: (
    featuresDatabase: SQLite.WebSQLDatabase,
    featuresCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  ) => Promise<void>,
  setError: (error: IError) => void
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

export const dropFeaturesTable = async (
  featuresDatabase: SQLite.WebSQLDatabase,
  setError: (error: IError) => void
) => {
  try {
    await executeSql!(featuresDatabase, `DROP TABLE IF EXISTS features;`, []);
  } catch (error) {
    setError({
      code: error.code,
      message: error.message,
    });
  }
};

export const filterFeaturesWithinBounds = (
  features: Feature<Geometry, GeoJsonProperties>[] | undefined,
  mapBoundaries: IMapBoundaries
) => {
  return features?.filter((feature) => {
    // destructure map boundaries
    const northEast = mapBoundaries!.northEast;
    const southWest = mapBoundaries!.southWest;

    // destructure northeast coordinates
    const neLat = northEast?.latitude;
    const neLng = northEast?.longitude;

    // destructure southwest coordinates
    const swLat = southWest?.latitude;
    const swLng = southWest?.longitude;

    // destructure feature
    const geometry = feature.geometry;

    // destructure geometry
    const coordinates = (geometry as Point).coordinates;
    const latitude = coordinates[1];
    const longitude = coordinates[0];

    // return feature if within current map bounds
    return (
      latitude < neLat &&
      longitude < neLng &&
      latitude > swLat &&
      longitude > swLng
    );
  });
};

export const getCurrentCounty = (
  features: Feature<Geometry, GeoJsonProperties>[],
  point: number[]
): Feature | undefined => {
  return features.find((feature) => {
    // destructure feature
    const {
      geometry: { coordinates },
    } = feature;

    // destructure coordinates
    // NOTE: coordinates is an array of three-dimensional arrays
    const [polygonCoordiantes] = coordinates;

    // use turf helpers to format params
    const pt = helpers.point(point);
    const poly = helpers.polygon(polygonCoordiantes);

    // return true if point falls within polygon coordinates
    return booleanPointInPolygon(pt, poly);
  });
};

export const getPolygonCoordinates = (
  features: Feature<Geometry, GeoJsonProperties>[]
): LatLng[][] => {
  return features.map((feature) => {
    // destructure feature
    const geometry = feature.geometry;

    // destructure geometry
    const coordinates = (geometry as MultiPolygon).coordinates;

    // destructure coordinates
    // NOTE: coordinates is an array of three-dimensional arrays
    const [[polygonCoordiantes]] = coordinates;

    // cap polygon by pushing first coordinate
    polygonCoordiantes.push(polygonCoordiantes[0]);

    return polygonCoordiantes.map((coordinate) => ({
      latitude: coordinate[1],
      longitude: coordinate[0],
    }));
  });
};

export const mergeResultSet = (
  features: Feature<Geometry, GeoJsonProperties>[] | undefined,
  newFeatures: Feature<Geometry, GeoJsonProperties>[],
  setFeatures: (
    features?: Feature<Geometry, GeoJsonProperties>[] | undefined
  ) => void
) => {
  // get previous features
  const prevFeatures = features;

  // create new Set of feature ids
  const prevFeatureIds = new Set(
    features?.map((feature) => feature.properties?.id)
  );

  // merge and dedupe feature arrays
  const mergedFeatures = [
    ...features!,
    ...newFeatures.filter(
      (feature) => !prevFeatureIds.has(feature.properties?.id)
    ),
  ];

  // update state
  setFeatures(mergedFeatures);
};

export const populateFeaturesTable = async (
  features: Feature<Geometry, GeoJsonProperties>[] | undefined,
  featuresCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  featuresDatabase: SQLite.WebSQLDatabase,
  featureFilters: IFeatureFilters,
  mapBoundaries: IMapBoundaries,
  setError: (error: IError) => void
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
      // NOTE: data object is equivalent to a Feature object
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
    queryFeaturesTable(
      features,
      featuresDatabase,
      featureFilters,
      mapBoundaries,
      setError
    );
  } catch (error) {
    setError({
      code: error.code,
      message: error.message,
    });
  }
};

export const processResultSet = (resultSet: SQLite.SQLResultSet) => {
  // destructure result set
  const { _array }: any = resultSet.rows;

  // convert result set array into GeoJSON Features
  const features = _array.map((result: ISQLResult) => {
    // create a GeoJSON Geometry from result coordinates
    const geometry: Geometry = {
      type: "Point",
      coordinates: [result.longitude, result.latitude],
    };

    // create a GeoJSON properties object from result properties
    const properties: GeoJsonProperties = { ...result };

    // create a GeoJSON Feature
    const feature: Feature = helpers.feature(geometry, properties);

    return feature;
  });

  // create GeoJSON FeatureCollection from GeoJSON Features
  const featureCollection: FeatureCollection<Point> = helpers.featureCollection(
    features
  );

  return featureCollection;
};

export const queryFeaturesTable = async (
  features: Feature<Geometry, GeoJsonProperties>[] | undefined,
  featuresDatabase: SQLite.WebSQLDatabase,
  featureFilters: IFeatureFilters,
  mapBoundaries: IMapBoundaries = initialMapBoundaries,
  setError: (error: IError) => void
) => {
  try {
    // destructure map boundaries
    const northEast = mapBoundaries.northEast;
    const southWest = mapBoundaries.southWest;

    // destructure northeast coordinates
    const neLat = northEast?.latitude;
    const neLng = northEast?.longitude;

    // destructure southwest coordinates
    const swLat = southWest?.latitude;
    const swLng = southWest?.longitude;

    // construct sql statement
    const sqlStatement = `
      SELECT *
      FROM features
      WHERE (
        latitude < ${neLat}
        AND longitude < ${neLng}
        AND latitude > ${swLat}
        AND longitude > ${swLng}
      ) AND (
        feet <= ${featureFilters.maxElevation}
      ) AND (
        ${featureFilters.above14 ? "(feet >= 14000)" : "(feet <= 14000)"}
        ) OR (
        ${
          featureFilters.between13and14
            ? "(feet BETWEEN 13000 AND 14000)"
            : "(feet NOT BETWEEN 13000 AND 14000)"
        }
        ) OR (
        ${
          featureFilters.between12and13
            ? "(feet BETWEEN 12000 AND 13000)"
            : "(feet NOT BETWEEN 12000 AND 13000)"
        }
        ) OR (
        ${
          featureFilters.between11and12
            ? "(feet BETWEEN 11000 AND 12000)"
            : "(feet NOT BETWEEN 11000 AND 12000)"
        }
        ) OR (
        ${
          featureFilters.between10and11
            ? "(feet BETWEEN 10000 AND 11000)"
            : "(feet NOT BETWEEN 10000 AND 11000)"
        }
        ) OR (
        ${featureFilters.below10 ? "(feet <= 10000)" : "(feet >= 10000)"}
      )
      ORDER BY meters DESC
      LIMIT 100;
      -- OFFSET 0
    `;
    const resultSet = await executeSql!(featuresDatabase, sqlStatement, []);
    console.log("resultSet.rows._array.length: ", resultSet.rows._array.length);

    // convert resultSet into FeatureCollection
    const featureCollection = processResultSet(resultSet);

    // return Features from FeatureCollection
    return featureCollection.features;
  } catch (error) {
    setError({
      code: error.code,
      message: error.message,
    });
  }
};

export const resetResultSet = (
  newFeatures: Feature<Geometry, GeoJsonProperties>[],
  setFeatures: (
    features?: Feature<Geometry, GeoJsonProperties>[] | undefined
  ) => void
) => {
  // update state
  setFeatures(newFeatures);
};

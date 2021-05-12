import * as SQLite from "expo-sqlite";
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Point,
} from "geojson";
import * as turf from "@turf/turf";
import { IQueryResult } from "./types";

/** Convert query result into individual GeoJSON Feature */
export const processFeature = (resultSet: SQLite.SQLResultSet) => {
  // destructure ResultSet
  const { _array }: any = resultSet.rows;

  // convert result into GeoJSON Feature
  const result = _array[0];

  // create a GeoJSON Geometry from result coordinates
  const geometry: Geometry = {
    type: "Point",
    coordinates: [result.longitude, result.latitude],
  };

  // create a GeoJSON properties object from result properties
  const properties: GeoJsonProperties = { ...result };

  // create a GeoJSON Feature
  const feature: Feature = turf.feature(geometry, properties);

  return feature;
};

/** Convert query result into GeoJSON FeatureCollection */
export const processFeatureCollection = (resultSet: SQLite.SQLResultSet) => {
  // destructure ResultSet
  const { _array }: any = resultSet.rows;

  // convert ResultSet array into GeoJSON Features
  const features = _array.map((result: IQueryResult) => {
    // create a GeoJSON Geometry from result coordinates
    const geometry: Geometry = {
      type: "Point",
      coordinates: [result.longitude, result.latitude],
    };

    // create a GeoJSON properties object from result properties
    const properties: GeoJsonProperties = { ...result };

    // create a GeoJSON Feature
    const feature: Feature = turf.feature(geometry, properties);

    return feature;
  });

  // create a GeoJSON FeatureCollection from GeoJSON Features
  const featureCollection: FeatureCollection<Point> = turf.featureCollection(
    features
  );

  return featureCollection;
};

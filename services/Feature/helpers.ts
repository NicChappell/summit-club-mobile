import * as turf from "@turf/turf";
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Point,
} from "geojson";
import { ResultSet } from "../database";
import { IFeatureRecord } from "./types";

/** Convert query result into individual GeoJSON Feature */
export const processFeature = (resultSet: ResultSet) => {
  // destructure result set
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
export const processFeatureCollection = (resultSet: ResultSet) => {
  // destructure result set
  const { _array }: any = resultSet.rows;

  // convert ResultSet array into GeoJSON Features
  const features = _array.map((result: IFeatureRecord) => {
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
  const featureCollection: FeatureCollection<Point> =
    turf.featureCollection(features);

  return featureCollection;
};

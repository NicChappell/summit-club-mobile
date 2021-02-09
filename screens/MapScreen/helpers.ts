import * as SQLite from "expo-sqlite";
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Point,
} from "geojson";
import * as helpers from "@turf/helpers";
import { ISQLResult } from "../../common/interfaces";

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

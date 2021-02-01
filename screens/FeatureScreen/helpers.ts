import * as SQLite from "expo-sqlite";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import * as helpers from "@turf/helpers";

export const processFeature = (ResultSet: SQLite.SQLResultSet) => {
  // destructure ResultSet
  const { _array }: any = ResultSet.rows;

  // get first result of ResultSet _array
  const result = _array[0];

  // create a GeoJSON Geometry from result coordinates
  const geometry: Geometry = {
    type: "Point",
    coordinates: [parseFloat(result.longitude), parseFloat(result.latitude)],
  };

  // create a GeoJSON properties object from result properties
  const properties: GeoJsonProperties = { ..._array[0] };

  // create a GeoJSON Feature
  const feature: Feature = helpers.feature(geometry, properties);

  return feature;
};

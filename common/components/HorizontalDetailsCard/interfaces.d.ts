import { Feature, Geometry, GeoJsonProperties } from "geojson";

export interface IHorizontalDetailsCard {
  /** Feature profile */
  feature: Feature<Geometry, GeoJsonProperties>;
}

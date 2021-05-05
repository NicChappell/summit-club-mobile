import { Feature, Geometry, GeoJsonProperties } from "geojson";

export interface IStaticMapBackground {
  /** Custom style definitions for map container */
  containerStyles?: any;
  /** Feature profile */
  feature: Feature<Geometry, GeoJsonProperties>;
  /** Overlay component */
  overlay?: any; // TODO: FIGURE OUT THIS TYPE
}

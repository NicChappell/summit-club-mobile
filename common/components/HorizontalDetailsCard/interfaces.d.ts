import { Feature, Geometry, GeoJsonProperties } from "geojson";

export interface IHorizontalDetailsCard {
  /** Custom View component for card content */
  ContentComponent: JSX.Element;
  /** Custom card dimensions */
  dimensions?: { height: number | string; width: number | string };
  /** Feature profile */
  feature: Feature<Geometry, GeoJsonProperties>;
}

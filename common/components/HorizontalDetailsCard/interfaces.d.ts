import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { StackNavigationProp } from "@react-navigation/stack";

export interface IHorizontalDetailsCard {
  /** Feature profile */
  feature: Feature<Geometry, GeoJsonProperties>;
  /** contains various convenience functions that dispatch navigation actions */
  navigation: StackNavigationProp;
}

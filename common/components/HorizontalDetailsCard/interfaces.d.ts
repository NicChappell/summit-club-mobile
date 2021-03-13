import { Feature } from "geojson";
import { ExploreScreenNavigationProp } from "../../types";

export interface IHorizontalDetailsCard {
  /** Feature profile */
  feature: Feature;
  /** contains various convenience functions that dispatch navigation actions */
  navigation: ExploreScreenNavigationProp;
}

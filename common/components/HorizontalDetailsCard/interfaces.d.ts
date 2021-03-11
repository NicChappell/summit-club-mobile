import { Feature } from "geojson";
import { ExploreScreenNavigationProp } from "../../types";

export interface IHorizontalDetailsCard {
  /** Feature profile */
  feature: Feature;
  /** TODO */
  navigation: ExploreScreenNavigationProp;
}

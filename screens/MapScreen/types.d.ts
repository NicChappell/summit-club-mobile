import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ExploreTabsParamList } from "../../navigation/navigators/ExploreTabs/types";

export type MapScreenNavigationProp = StackNavigationProp<
  ExploreTabsParamList,
  "Map"
>;

export type MapScreenRouteProp = RouteProp<ExploreTabsParamList, "Map">;

export interface IMapScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: MapScreenNavigationProp;
  /** Contains various information regarding current route */
  route: MapScreenRouteProp;
}

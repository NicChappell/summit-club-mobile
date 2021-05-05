import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ExploreTabsParamList } from "../../navigation/navigators/ExploreTabs/types";

export type ExploreScreenNavigationProp = StackNavigationProp<
  ExploreTabsParamList,
  "Explore"
>;

export type ExploreScreenRouteProp = RouteProp<ExploreTabsParamList, "Explore">;

export interface IExploreScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: ExploreScreenNavigationProp;
  /** Contains various information regarding current route */
  route: ExploreScreenRouteProp;
}

export type SortMethod = "ascending" | "descending";

export type SortMethodIcon = "ios-caret-up" | "ios-caret-down";

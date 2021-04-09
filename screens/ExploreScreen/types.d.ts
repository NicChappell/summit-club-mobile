import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ExploreTabsParamList } from "../../navigation/navigators/ExploreTabs/types";

export type ExploreScreenNavigationProp = StackNavigationProp<
  ExploreTabsParamList,
  "Explore"
>;

export type ExploreScreenRouteProp = RouteProp<
  ExploreTabsParamList,
  "Explore"
>;

export type SortMethod = "ascending" | "descending";

export type SortMethodIcon = "ios-caret-up" | "ios-caret-down";

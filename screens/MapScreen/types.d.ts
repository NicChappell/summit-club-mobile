import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ExploreTabsParamList } from "../../navigation/navigators/ExploreTabs/types";

export type MapScreenNavigationProp = StackNavigationProp<
  ExploreTabsParamList,
  "Map"
>;

export type MapScreenRouteProp = RouteProp<ExploreTabsParamList, "Map">;

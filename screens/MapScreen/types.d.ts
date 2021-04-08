import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ExploreStackParamList } from "../../navigation/navigators/ExploreStack/types";

export type MapScreenNavigationProp = StackNavigationProp<
  ExploreStackParamList,
  "Map"
>;

export type MapScreenRouteProp = RouteProp<ExploreStackParamList, "Map">;

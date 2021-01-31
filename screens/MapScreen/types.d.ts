import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MapStackParamList } from "../../navigation/navigators/MapStack/types";

export type MapScreenNavigationProp = StackNavigationProp<
  MapStackParamList,
  "Map"
>;

export type MapScreenRouteProp = RouteProp<MapStackParamList, "Map">;

import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MapStackParamList } from "../../navigation/navigators/MapStack/types";

export type FeatureScreenNavigationProp = StackNavigationProp<
  MapStackParamList,
  "Feature"
>;

export type FeatureScreenRouteProp = RouteProp<MapStackParamList, "Feature">;

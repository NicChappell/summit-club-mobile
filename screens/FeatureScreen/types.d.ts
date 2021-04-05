import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { FeatureStackParamList } from "../../navigation/navigators/FeatureStack/types";

export type FeatureScreenNavigationProp = StackNavigationProp<
FeatureStackParamList,
  "Feature"
>;

export type FeatureScreenRouteProp = RouteProp<FeatureStackParamList, "Feature">;

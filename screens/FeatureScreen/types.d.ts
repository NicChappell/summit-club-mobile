import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { FeatureStackParamList } from "../../navigation/navigators/FeatureStack/types";

export type FeatureScreenNavigationProp = StackNavigationProp<
  FeatureStackParamList,
  "Feature"
>;

export type FeatureScreenRouteProp = RouteProp<
  FeatureStackParamList,
  "Feature"
>;

export interface IFeatureScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: FeatureScreenNavigationProp;
  /** Contains various information regarding current route */
  route: FeatureScreenRouteProp;
}

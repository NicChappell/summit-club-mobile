import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ExploreStackParamList } from "../../navigation/navigators/ExploreStack/types";

export type CheckInScreenNavigationProp = StackNavigationProp<
ExploreStackParamList,
  "CheckIn"
>;

export type CheckInScreenRouteProp = RouteProp<
ExploreStackParamList,
  "CheckIn"
>;

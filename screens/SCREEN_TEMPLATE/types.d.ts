import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { MainTabsParamList } from "../../navigation/navigators/MainTabs/types";

export type BlankScreenNavigationProp = BottomTabNavigationProp<
  MainTabsParamList,
  "Blank"
>;

export type BlankScreenRouteProp = RouteProp<MainTabsParamList, "Blank">;

// import { StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigation/native';
// import { ProfileStackParamList } from '../../navigation/navigators/ProfileStack/types';

// export type ContactScreenNavigationProp = StackNavigationProp<
// ProfileStackParamList,
//     'Blank'
// >;

// export type ContactScreenRouteProp = RouteProp<ProfileStackParamList, 'Blank'>;

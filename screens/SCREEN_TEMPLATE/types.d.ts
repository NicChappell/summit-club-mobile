import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { MainTabsParamList } from "../../navigation/navigators/MainTabs/types";

export type BlankScreenNavigationProp = BottomTabNavigationProp<
  MainTabsParamList,
  "Blank"
>;

export type BlankScreenRouteProp = RouteProp<MainTabsParamList, "Blank">;

export interface IBlankScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: BlankScreenNavigationProp;
  /** Contains various information regarding current route */
  route: BlankScreenRouteProp;
}

// import { StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigation/native';
// import { ProfileStackParamList } from '../../navigation/navigators/ProfileStack/types';

// export type BlankScreenNavigationProp = StackNavigationProp<
// ProfileStackParamList,
//     'Blank'
// >;

// export type BlankScreenRouteProp = RouteProp<ProfileStackParamList, 'Blank'>;

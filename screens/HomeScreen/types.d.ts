import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { HomeTabsParamList } from '../../navigation/navigators/HomeTabs/types';

export type HomeScreenNavigationProp = BottomTabNavigationProp<
    HomeTabsParamList,
    'Home'
>;

export type HomeScreenRouteProp = RouteProp<HomeTabsParamList, 'Home'>;

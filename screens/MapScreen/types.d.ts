import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { MainTabsParamList } from '../../navigation/navigators/MainTabs/types';

export type MapScreenNavigationProp = BottomTabNavigationProp<
MainTabsParamList,
    'Map'
>;

export type MapScreenRouteProp = RouteProp<MainTabsParamList, 'Map'>;

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { HomeTabsParamList } from '../../navigation/navigators/HomeTabs'

export type TourScreenNavigationProp = BottomTabNavigationProp<
    HomeTabsParamList,
    'Tour'
>;

export type TourScreenRouteProp = RouteProp<HomeTabsParamList, 'Tour'>;

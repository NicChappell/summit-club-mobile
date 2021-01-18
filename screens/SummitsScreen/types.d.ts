import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { MainTabsParamList } from '../../navigation/navigators/MainTabs/types';

export type SummitsScreenNavigationProp = BottomTabNavigationProp<
MainTabsParamList,
    'Summits'
>;

export type SummitsScreenRouteProp = RouteProp<MainTabsParamList, 'Summits'>;

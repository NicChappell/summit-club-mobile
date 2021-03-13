import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { MainTabsParamList } from '../../navigation/navigators/MainTabs/types'

export type DownloadScreenNavigationProp = BottomTabNavigationProp<
MainTabsParamList,
    'Download'
>;

export type DownloadScreenRouteProp = RouteProp<MainTabsParamList, 'Download'>;

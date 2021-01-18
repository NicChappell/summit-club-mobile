import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { SettingsStackParamList } from '../../navigation/navigators/SettingsStack/types';

export type LandmarksScreenNavigationProp = BottomTabNavigationProp<
SettingsStackParamList,
    'Landmarks'
>;

export type LandmarksScreenRouteProp = RouteProp<SettingsStackParamList, 'Landmarks'>;

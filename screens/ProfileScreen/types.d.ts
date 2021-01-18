import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { SettingsStackParamList } from '../../navigation/navigators/SettingsStack/types';

export type ProfileScreenNavigationProp = BottomTabNavigationProp<
SettingsStackParamList,
    'Profile'
>;

export type ProfileScreenRouteProp = RouteProp<SettingsStackParamList, 'Profile'>;

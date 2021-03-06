import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProfileStackParamList } from '../../navigation/navigators/ProfileStack/types';

export type SettingsScreenNavigationProp = BottomTabNavigationProp<
ProfileStackParamList,
    'Settings'
>;

export type SettingsScreenRouteProp = RouteProp<ProfileStackParamList, 'Settings'>;

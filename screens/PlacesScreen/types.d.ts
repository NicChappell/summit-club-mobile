import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { SettingsStackParamList } from '../../navigation/navigators/SettingsStack/types';

export type PlacesScreenNavigationProp = BottomTabNavigationProp<
SettingsStackParamList,
    'Places'
>;

export type PlacesScreenRouteProp = RouteProp<SettingsStackParamList, 'Places'>;

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { SettingsStackParamList } from '../../navigation/navigators/SettingsStack/types';

export type ResetPasswordScreenNavigationProp = BottomTabNavigationProp<
SettingsStackParamList,
    'ResetPassword'
>;

export type ResetPasswordScreenRouteProp = RouteProp<SettingsStackParamList, 'ResetPassword'>;

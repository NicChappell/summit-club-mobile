import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProfileStackParamList } from '../../navigation/navigators/ProfileStack/types';

export type ResetPasswordScreenNavigationProp = BottomTabNavigationProp<
ProfileStackParamList,
    'ResetPassword'
>;

export type ResetPasswordScreenRouteProp = RouteProp<ProfileStackParamList, 'ResetPassword'>;

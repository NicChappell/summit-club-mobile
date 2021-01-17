import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/navigators/AuthStack/types';

export type SignInScreenNavigationProp = BottomTabNavigationProp<
AuthStackParamList,
    'SignIn'
>;

export type SignInScreenRouteProp = RouteProp<AuthStackParamList, 'SignIn'>;

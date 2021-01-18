import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/navigators/AuthStack/types';

export type SignUpScreenNavigationProp = BottomTabNavigationProp<
AuthStackParamList,
    'SignUp'
>;

export type SignUpScreenRouteProp = RouteProp<AuthStackParamList, 'SignUp'>;

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { MapStackParamList } from '../../navigation/navigators/MapStack/types';

export type FeatureScreenNavigationProp = BottomTabNavigationProp<
MapStackParamList,
    'Feature'
>;

export type FeatureScreenRouteProp = RouteProp<MapStackParamList, 'Feature'>;

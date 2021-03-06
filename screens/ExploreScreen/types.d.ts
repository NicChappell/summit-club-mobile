import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ExploreStackParamList } from '../../navigation/navigators/ExploreStack/types';

export type ExploreScreenNavigationProp = StackNavigationProp<
ExploreStackParamList,
    'Explore'
>;

export type ExploreScreenRouteProp = RouteProp<ExploreStackParamList, 'Explore'>;

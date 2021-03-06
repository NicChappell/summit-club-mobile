import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { SummitsStackParamList } from '../../navigation/navigators/SummitsStack/types';

export type SummitsScreenNavigationProp = StackNavigationProp<
SummitsStackParamList,
    'Summits'
>;

export type SummitsScreenRouteProp = RouteProp<SummitsStackParamList, 'Summits'>;

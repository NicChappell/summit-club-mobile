import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from "../../navigation/navigators/HomeStack/types";

export type SearchResultsScreenNavigationProp = StackNavigationProp<
HomeStackParamList,
    'SearchResults'
>;

export type SearchResultsScreenRouteProp = RouteProp<HomeStackParamList, 'SearchResults'>;

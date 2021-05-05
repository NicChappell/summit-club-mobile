import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../../navigation/navigators/HomeStack/types";

export type SearchResultsScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "SearchResults"
>;

export type SearchResultsScreenRouteProp = RouteProp<
  HomeStackParamList,
  "SearchResults"
>;

export interface ISearchResultsScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: SearchResultsScreenNavigationProp;
  /** Contains various information regarding current route */
  route: SearchResultsScreenRouteProp;
}

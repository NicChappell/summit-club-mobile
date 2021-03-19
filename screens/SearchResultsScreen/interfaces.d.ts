import { SearchResultsScreenNavigationProp, SearchResultsScreenRouteProp } from "./types";

export interface ISearchResultsScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: SearchResultsScreenNavigationProp;
  /** Contains various information regarding current route */
  route: SearchResultsScreenRouteProp;
}

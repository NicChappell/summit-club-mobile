import { SearchResultsScreenNavigationProp, SearchResultsScreenRouteProp } from "./types";

export interface ISearchResultsScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: SearchResultsScreenNavigationProp;
  /** contains various information regarding current route */
  route: SearchResultsScreenRouteProp;
}

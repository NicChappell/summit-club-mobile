import { SearchResultsScreenNavigationProp } from "../../../screens/SearchResultsScreen/types";

export interface ISearchResultsListItem {
  /** The Summit name */
  name: string;
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: SearchResultsScreenNavigationProp;
}

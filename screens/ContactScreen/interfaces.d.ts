import { ContactScreenNavigationProp, ContactScreenRouteProp } from "./types";

export interface IContactScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: ContactScreenNavigationProp;
  /** Contains various information regarding current route */
  route: ContactScreenRouteProp;
}

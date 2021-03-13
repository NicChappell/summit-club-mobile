import { ContactScreenNavigationProp, ContactScreenRouteProp } from "./types";

export interface IContactScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: ContactScreenNavigationProp;
  /** contains various information regarding current route */
  route: ContactScreenRouteProp;
}

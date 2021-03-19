import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "./types";

export interface IProfileScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: ProfileScreenNavigationProp;
  /** Contains various information regarding current route */
  route: ProfileScreenRouteProp;
}

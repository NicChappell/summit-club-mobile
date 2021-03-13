import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "./types";

export interface IProfileScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: ProfileScreenNavigationProp;
  /** contains various information regarding current route */
  route: ProfileScreenRouteProp;
}

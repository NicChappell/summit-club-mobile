import { CheckInScreenNavigationProp, CheckInScreenRouteProp } from "./types";

export interface ICheckInScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: CheckInScreenNavigationProp;
  /** Contains various information regarding current route */
  route: CheckInScreenRouteProp;
}

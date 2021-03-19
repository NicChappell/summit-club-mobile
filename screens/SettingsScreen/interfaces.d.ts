import {
  SettingsScreenNavigationProp,
  SettingsScreenRouteProp,
} from "./types";

export interface ISettingsScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: SettingsScreenNavigationProp;
  /** Contains various information regarding current route */
  route: SettingsScreenRouteProp;
}

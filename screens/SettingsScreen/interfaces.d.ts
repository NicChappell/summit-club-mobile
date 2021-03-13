import {
  SettingsScreenNavigationProp,
  SettingsScreenRouteProp,
} from "./types";

export interface ISettingsScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: SettingsScreenNavigationProp;
  /** contains various information regarding current route */
  route: SettingsScreenRouteProp;
}

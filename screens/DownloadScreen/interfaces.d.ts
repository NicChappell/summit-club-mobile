import { DownloadScreenNavigationProp, DownloadScreenRouteProp } from "./types";

export interface IDownloadScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: DownloadScreenNavigationProp;
  /** Contains various information regarding current route */
  route: DownloadScreenRouteProp;
}

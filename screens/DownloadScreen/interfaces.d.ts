import { DownloadScreenNavigationProp, DownloadScreenRouteProp } from "./types";

export interface IDownloadScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: DownloadScreenNavigationProp;
  /** contains various information regarding current route */
  route: DownloadScreenRouteProp;
}

export interface ISuccessOverlay {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: FeatureScreenNavigationProp;
  /** Controls component visibility */
  visible: boolean;
  /** Setter function for visible boolean */
  setVisible: (visible: boolean) => void;
}

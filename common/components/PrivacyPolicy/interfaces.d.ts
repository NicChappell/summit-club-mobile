export interface IPrivacyPolicy {
  /** function to set visible state value */
  setVisible: (visible: React.SetStateAction<boolean>) => void;
  /** boolean to selectively render privacy policy component */
  visible: boolean;
}

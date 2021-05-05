export interface ITermsAndConditions {
  /** function to set visible state value */
  setVisible: (visible: React.SetStateAction<boolean>) => void;
  /** boolean to selectively render terms and conditions component */
  visible: boolean;
}

export interface IIneligibleOverlay {
  /** Distance between current location and summit measured in kilometers */
  distance: number;
  /** Controls component visibility */
  visible: boolean;
  /** Setter function for visible boolean */
  setVisible: (visible: boolean) => void;
}

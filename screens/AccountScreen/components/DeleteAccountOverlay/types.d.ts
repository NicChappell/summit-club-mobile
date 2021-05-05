export interface IDeleteAccountOverlay {
  /** The user's username */
  username: string;
  /** Controls component visibility */
  visible: boolean;
  /** Setter function for visible boolean */
  setVisible: (visible: boolean) => void;
}

export interface IResetPasswordOverlay {
  /** The user's password */
  password: string;
  /** Controls component visibility */
  visible: boolean;
  /** Setter function for visible boolean */
  setVisible: (visible: boolean) => void;
}

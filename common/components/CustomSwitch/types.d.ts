export interface ICustomSwitch {
  /** function that handles switch change */
  handleSwitchChange: () => void;
  /** indicates if the switch is on or off */
  value: boolean;
}

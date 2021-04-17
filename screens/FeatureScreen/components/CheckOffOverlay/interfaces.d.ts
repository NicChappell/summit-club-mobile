export interface ICheckOffOverlay {
  /** Check off status */
  checkOff: boolean;
  /** Feature profile */
  feature: Feature<Geometry, GeoJsonProperties>;
  /** Controls component visibility */
  visible: boolean;
  /** Setter function for visible boolean */
  setVisible: (visible: boolean) => void;
}

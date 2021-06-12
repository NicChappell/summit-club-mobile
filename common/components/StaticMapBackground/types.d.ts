import { Feature } from "../../../common/types";

export interface IStaticMapBackground {
  /** Custom style definitions for map container */
  containerStyles: any;
  /** Feature profile */
  feature?: Feature;
}

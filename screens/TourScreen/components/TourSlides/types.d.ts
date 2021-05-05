import { ITourSlide } from "../../interfaces";

export interface ITourSlides {
  /** array of slide data */
  data: ITourSlide[];
  /** functions that dispatches a redux action to update global account state */
  onComplete: () => void;
}

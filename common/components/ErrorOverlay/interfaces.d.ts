import { IError } from "../../../common/interfaces";

export interface IErrorOverlay {
  /** functions that dispatches a redux action to reset global error state */
  clearError: () => void;
  /** object with optional error code and optional error message */
  error: IError;
}

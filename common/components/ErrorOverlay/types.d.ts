import { IError } from "../../types";

export interface IErrorOverlay {
  /** function that dispatches a redux action to reset global error state */
  clearError: () => void;
  /** object with optional error code and optional error message */
  error: IError;
}

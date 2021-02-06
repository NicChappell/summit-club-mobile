import { IError } from "../../../common/interfaces";

export interface IErrorOverlay {
  /** TODO */
  clearError: () => void;
  /** TODO */
  error: IError;
}

export interface IAction {
  /** action type */
  type: string;
  /** action payload */
  payload: any;
}

export interface IAuthCredentials {
  /** user provided email */
  email: string;
  /** user provided password */
  password: string;
}

export interface IError {
  /** error code */
  code?: string;
  /** error message */
  message?: string;
}

export interface ISQLResult {
  /** TODO */
  difficulty: string;
  /** TODO */
  distanceMiles: string;
  /** TODO */
  elevationFeet: string;
  /** TODO */
  elevationGainFeet: string;
  /** TODO */
  fourteener: boolean;
  /** TODO */
  latitude: string;
  /** TODO */
  longitude: string;
  /** TODO */
  mountainPeak: string;
  /** TODO */
  mountainRange: string;
  /** TODO */
  photo: string;
  /** TODO */
  slug: string;
}

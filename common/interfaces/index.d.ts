export interface IAction {
  /** TODO */
  type: string;
  /** TODO */
  payload: any;
}

export interface IAuthCredentials {
  /** TODO */
  email: string;
  /** TODO */
  password: string;
}

export interface IError {
  code?: string;
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

export interface IUserIdToken {
  /** TODO */
  idToken?: string;
}

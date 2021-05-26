import firebase from "firebase/app";

/** CheckOff document properties */
export type CheckOffDocumentProperty =
  | "id"
  | "userId"
  | "featureId"
  | "createdAt";

/** CheckOff record properties */
export type CheckOffRecordProperty =
  | "id"
  | "user_id"
  | "feature_id"
  | "created_at";

export interface ICheckOffDocument {
  /** Uniquely identifies the CheckOff document */
  id: string;
  /** Uniquely identifies a User document */
  userId: string;
  /** Uniquely identifies a Feature document */
  featureId: string;
  /** Timestamp when the document was created measured in milliseconds */
  createdAt: firebase.firestore.Timestamp;
}

export interface ICheckOffRecord {
  /** Uniquely identifies the CheckOff record */
  id: string;
  /** Uniquely identifies a User record */
  user_id: string;
  /** Uniquely identifies a Feature record */
  feature_id: string;
  /** Timestamp when the record was created measured in milliseconds */
  created_at: number;
}

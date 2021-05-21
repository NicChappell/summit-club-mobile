import firebase from "firebase/app";

/** A Firestore document */
export type CheckOffDocument = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

/** List of CheckOff record property names */
export type CheckOffProperty =
  | "id"
  | "user_id"
  | "feature_id"
  | "created_at"
  | "updated_at";

export interface ICheckOffRecord {
  /** Uniquely identifies the CheckOff record */
  id: string;
  /** Uniquely identifies a User record */
  userId: string;
  /** Uniquely identifies a Feature record */
  featureId: string;
  /** Timestamp when the record was created measured in milliseconds */
  createdAt: number;
  /** Timestamp when the record was last updated measured in milliseconds */
  updatedAt: number;
}

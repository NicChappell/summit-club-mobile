import firebase from "firebase/app";

/** A Firestore document */
export type CheckOffDocument =
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

/** A Firestore query */
export type CheckOffQuery =
  firebase.firestore.Query<firebase.firestore.DocumentData>;

/** A Firestore query snapshot */
export type CheckOffQuerySnapshot =
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;

/** List of CheckOff record property names */
export type CheckOffProperty = "id" | "user_id" | "feature_id" | "created_at";

export interface ICheckOffDocument {
  /** Uniquely identifies the CheckOff record */
  id: string;
  /** Uniquely identifies a User record */
  userId: string;
  /** Uniquely identifies a Feature record */
  featureId: string;
  /** Timestamp when the record was created measured in milliseconds */
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

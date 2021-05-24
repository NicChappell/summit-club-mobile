import firebase from "firebase/app";

/** A Firestore document */
export type FirebaseDocumentReference =
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

/** A Firestore query */
export type FirebaseQuery =
  firebase.firestore.Query<firebase.firestore.DocumentData>;

/** A Firestore query snapshot */
export type FirebaseQuerySnapshot =
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;

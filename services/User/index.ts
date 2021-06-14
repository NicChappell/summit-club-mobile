import {
  FirebaseDocumentReference,
  FirebaseQuery,
  usersCollectionRef,
} from "../Firebase";
import {
  UserId,
  IUserAccount,
  IUserContact,
  IUserDocument,
  IUserSettings,
} from "./types";

class User {
  /** Add new document to users collection */
  static add = (id: UserId, payload: IUserDocument): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        // execute query and wait for response
        await usersCollectionRef.doc(id).set(payload);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Delete existing document from users collection */
  static deleteDocument = (id: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        // get document reference
        const docRef: FirebaseDocumentReference = usersCollectionRef.doc(id);

        // delete the document and wait for response
        await docRef.delete();

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Retrieve a document from users collection */
  static get = (id: string): Promise<IUserDocument> => {
    return new Promise(async (resolve, reject) => {
      try {
        // execute query and wait for document reference
        const documentRef = usersCollectionRef.doc(id);

        // execute query and wait for snapshot
        const snapshot = await documentRef.get();

        // resolve user document
        resolve({ ...snapshot.data() } as IUserDocument);
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default User;

export { IUserAccount, IUserContact, IUserDocument, IUserSettings, UserId };

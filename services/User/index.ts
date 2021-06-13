import {
  FirebaseDocumentReference,
  FirebaseQuery,
  FirebaseQuerySnapshot,
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
  static add = (payload: Partial<IUserDocument>): Promise<IUserDocument> => {
    return new Promise(async (resolve, reject) => {
      try {
        // execute query and wait for document reference
        const documentRef = await usersCollectionRef.add(payload);

        // execute query and wait for snapshot
        const snapshot = await documentRef.get();

        // format check-in document
        const checkInDocument = {
          ...snapshot.data(),
          id: documentRef.id,
        };

        // resolve check-in document
        resolve(checkInDocument as IUserDocument);
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

        // delete the document
        await docRef.delete();

        // resolve snapshot
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Retrieve a document from users collection */
  static get = (
    queryParams: Partial<IUserDocument>
  ): Promise<FirebaseQuerySnapshot> => {
    return new Promise(async (resolve, reject) => {
      try {
        // construct query
        let query: FirebaseQuery = usersCollectionRef;

        // convert params object into array of [key, value] pairs
        // add condition to query for each [key, value] pair
        Object.entries(queryParams).forEach((queryParam) => {
          query = query.where(queryParam[0], "==", queryParam[1]);
        });

        // execute query and wait for snapshot
        const snapshot = await query.get();

        // resolve snapshot
        resolve(snapshot);
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default User;

export { IUserAccount, IUserContact, IUserDocument, IUserSettings, UserId };

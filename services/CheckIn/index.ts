import { executeSql, ResultSet } from "../database";
import {
  checkInsCollectionRef,
  FirebaseDocumentReference,
  FirebaseQuery,
  FirebaseQuerySnapshot,
} from "../Firebase";
import { ICheckInDocument, ICheckInRecord, ICheckInResult } from "./types";

class CheckIn {
  /** Add new document to checkIns collection */
  static add = (
    payload: Partial<ICheckInDocument>
  ): Promise<ICheckInDocument> => {
    return new Promise(async (resolve, reject) => {
      try {
        // execute query and wait for document reference
        const documentRef = await checkInsCollectionRef.add(payload);

        // execute query and wait for snapshot
        const snapshot = await documentRef.get();

        // format check-in document
        const checkInDocument = {
          ...snapshot.data(),
          id: documentRef.id,
        };

        // resolve check-in document
        resolve(checkInDocument as ICheckInDocument);
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Delete existing document from checkIns collection */
  static deleteDocument = (id: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        // get document reference
        const docRef: FirebaseDocumentReference = checkInsCollectionRef.doc(id);

        // delete the document
        await docRef.delete();

        // resolve snapshot
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Delete existing record from check_in table */
  static deleteRecord = (id: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        // construct query
        const sqlStatement = `DELETE FROM check_in WHERE id = "${id}";`;

        // execute query and wait for result
        await executeSql(sqlStatement);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Retrieve a document from checkIns collection */
  static get = (
    queryParams: Partial<ICheckInDocument>
  ): Promise<FirebaseQuerySnapshot> => {
    return new Promise(async (resolve, reject) => {
      try {
        // construct query
        let query: FirebaseQuery = checkInsCollectionRef;

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

  /** Insert new record into check_in table */
  static insert = (payload: ICheckInRecord): Promise<ResultSet> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStatement = `
          INSERT OR REPLACE INTO check_in (
            id,
            user_id,
            feature_id,
            created_at
          ) VALUES (
            ?,?,?,?
          );
        `;

        const args = [
          payload.id,
          payload.user_id,
          payload.feature_id,
          payload.created_at,
        ];

        const resultSet = await executeSql(sqlStatement, args);

        resolve(resultSet);
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Count check_in table rows */
  static countRows = (): Promise<number> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStatement = `SELECT COUNT(*) FROM check_in;`;

        const resultSet = await executeSql(sqlStatement);
        // destructure result set
        const {
          rows: { _array },
        }: any = resultSet;

        // get count from ResultSet array
        const count = _array[0]["COUNT(*)"];

        resolve(count);
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Create check_in table */
  static createTable = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStatement = `
          CREATE TABLE IF NOT EXISTS check_in (
              id TEXT NOT NULL PRIMARY KEY,
              user_id TEXT,
              feature_id TEXT,
              created_at INTEGER
          );
        `;

        await executeSql(sqlStatement);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Drop check_in table */
  static dropTable = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStatement = `DROP TABLE IF EXISTS check_in;`;

        await executeSql(sqlStatement);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Find all records in check_in table */
  static selectAll = (): Promise<ResultSet> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStatement = `
          SELECT
            feature.class,
            feature.continent,
            feature.country,
            feature.county,
            check_in.created_at,
            feature.id AS feature_id,
            feature.feet,
            check_in.id,
            feature.latitude,
            feature.longitude,
            feature.meters,
            feature.name,
            feature.state,
            check_in.user_id
          FROM check_in
          INNER JOIN feature ON feature.id = check_in.feature_id
          ORDER BY check_in.created_at DESC
          LIMIT 50;
        `;

        const resultSet = await executeSql(sqlStatement);

        resolve(resultSet);
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Find matching record in check_in table */
  static selectWhere = (
    queryParams: Partial<ICheckInRecord>
  ): Promise<ResultSet> => {
    return new Promise(async (resolve, reject) => {
      try {
        // convert params object into array of [key, value] pairs
        // construct query condition using each [key, value] pair
        const condition = Object.entries(queryParams)
          .map((queryParam) => {
            return `${queryParam[0]} = '${queryParam[1]}'`;
          })
          .join(" AND ");

        const sqlStatement = `
          SELECT
            feature.class,
            feature.continent,
            feature.country,
            feature.county,
            check_in.created_at,
            feature.id AS feature_id,
            feature.feet,
            check_in.id,
            feature.latitude,
            feature.longitude,
            feature.meters,
            feature.name,
            feature.state,
            check_in.user_id
          FROM check_in
          INNER JOIN feature ON feature.id = check_in.feature_id
          WHERE ${condition}
          ORDER BY check_in.created_at DESC
          LIMIT 50;
        `;

        const resultSet = await executeSql(sqlStatement);

        resolve(resultSet);
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default CheckIn;

export { ICheckInDocument, ICheckInRecord, ICheckInResult };

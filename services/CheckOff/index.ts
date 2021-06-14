import { executeSql, ResultSet } from "../database";
import {
  checkOffsCollectionRef,
  FirebaseDocumentReference,
  FirebaseQuery,
  FirebaseQuerySnapshot,
} from "../Firebase";
import { ICheckOffDocument, ICheckOffRecord, ICheckOffResult } from "./types";

class CheckOff {
  /** Add new document to checkOffs collection */
  static add = (
    payload: Partial<ICheckOffDocument>
  ): Promise<ICheckOffDocument> => {
    return new Promise(async (resolve, reject) => {
      try {
        // execute query and wait for document reference
        const documentRef = await checkOffsCollectionRef.add(payload);

        // execute query and wait for snapshot
        const snapshot = await documentRef.get();

        // resolve check-off document
        resolve({
          ...snapshot.data(),
          id: documentRef.id,
        } as ICheckOffDocument);
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Delete existing document from checkOffs collection */
  static deleteDocument = (id: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        // get document reference
        const docRef: FirebaseDocumentReference =
          checkOffsCollectionRef.doc(id);

        // delete the document and wait for response
        await docRef.delete();

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Delete existing record from check_off table */
  static deleteRecord = (id: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        // construct query
        const sqlStatement = `DELETE FROM check_off WHERE id = "${id}";`;

        // execute query and wait for result
        await executeSql(sqlStatement);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Retrieve a document from checkOffs collection */
  static get = (
    queryParams: Partial<ICheckOffDocument>
  ): Promise<FirebaseQuerySnapshot> => {
    return new Promise(async (resolve, reject) => {
      try {
        // construct query
        let query: FirebaseQuery = checkOffsCollectionRef;

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

  /** Insert new record into check_off table */
  static insert = (payload: ICheckOffRecord): Promise<ResultSet> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStatement = `
          INSERT OR REPLACE INTO check_off (
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

  /** Count check_off table rows */
  static countRows = (): Promise<number> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStatement = `SELECT COUNT(*) FROM check_off;`;

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

  /** Create check_off table */
  static createTable = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStatement = `
          CREATE TABLE IF NOT EXISTS check_off (
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

  /** Drop check_off table */
  static dropTable = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStatement = `DROP TABLE IF EXISTS check_off;`;

        await executeSql(sqlStatement);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Find all records in check_off table */
  static selectAll = (): Promise<ResultSet> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStatement = `
          SELECT
            feature.class,
            feature.continent,
            feature.country,
            feature.county,
            check_off.created_at,
            feature.id AS feature_id,
            feature.feet,
            check_off.id,
            feature.latitude,
            feature.longitude,
            feature.meters,
            feature.name,
            feature.state,
            check_off.user_id
          FROM check_off
          INNER JOIN feature ON feature.id = check_off.feature_id
          ORDER BY check_off.created_at DESC
          LIMIT 50;
        `;

        const resultSet = await executeSql(sqlStatement);

        resolve(resultSet);
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Find matching record in check_off table */
  static selectWhere = (
    queryParams: Partial<ICheckOffRecord>
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
            check_off.created_at,
            feature.id AS feature_id,
            feature.feet,
            check_off.id,
            feature.latitude,
            feature.longitude,
            feature.meters,
            feature.name,
            feature.state,
            check_off.user_id
          FROM check_off
          INNER JOIN feature ON feature.id = check_off.feature_id
          WHERE ${condition}
          ORDER BY check_off.created_at DESC
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

export default CheckOff;

export { ICheckOffDocument, ICheckOffRecord, ICheckOffResult };

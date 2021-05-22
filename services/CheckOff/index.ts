import * as SQLite from "expo-sqlite";
import { executeSql } from "../database";
import { checkOffsCollectionRef } from "../firebase";
import {
  CheckOffDocument,
  CheckOffQuery,
  CheckOffProperty,
  ICheckOffDocument,
  ICheckOffRecord,
} from "./types";

class CheckOff {
  /** Add new document to checkOffs collection */
  static add = (payload: Partial<ICheckOffDocument>): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await checkOffsCollectionRef.add(payload);

        console.log("Added document with ID: ", res.id);

        resolve(res.id);
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Delete existing record from check_off table by collection of key value pairs */
  static delete = (
    queryParams: Partial<ICheckOffRecord>
  ): Promise<SQLite.SQLResultSet> => {
    const condition = Object.entries(queryParams)
      .map((queryParam) => {
        return `${queryParam[0]} = '${queryParam[1]}'`;
      })
      .join(" AND ");

    return new Promise((resolve, reject) => {
      const sqlStatement = `DELETE FROM check_off WHERE ${condition};`;

      executeSql(sqlStatement)
        .then((resultSet) => {
          resolve(resultSet);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /** Retrieve a document from checkOffs collection */
  static get = (
    queryParams: Partial<ICheckOffDocument>
  ): Promise<ICheckOffDocument | null> => {
    return new Promise(async (resolve, reject) => {
      try {
        // construct Firestore query
        let query: CheckOffQuery = checkOffsCollectionRef;

        // convert params object into array of [key, value] pairs
        // add condition to query for each [key, value] pair
        Object.entries(queryParams).forEach((queryParam) => {
          query = query.where(queryParam[0], "==", queryParam[1]);
        });

        // execute query and wait for snapshot
        const snapshot = await query.get();

        if (snapshot.empty) {
          resolve(null);
        } else {
          // format snapshot
          const document = {
            ...snapshot.docs[0].data(),
            id: snapshot.docs[0].id,
          };
          resolve(document as ICheckOffDocument);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Insert new record into check_off table */
  static insert = (payload: ICheckOffRecord): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `
        INSERT OR REPLACE INTO check_off (
          id,
          user_id,
          feature_id,
          created_at,
          updated_at
        ) VALUES (
          ?,?,?,?,?
        );
      `;

      const args = [
        payload.id,
        payload.user_id,
        payload.feature_id,
        payload.created_at,
        payload.updated_at,
      ];

      executeSql(sqlStatement, args)
        .then((resultSet) => {
          resolve(resultSet);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /** Count check_off table rows */
  static countRows = (): Promise<number> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `SELECT COUNT(*) FROM check_off;`;

      executeSql(sqlStatement)
        .then((resultSet) => {
          // destructure ResultSet
          const {
            rows: { _array },
          }: any = resultSet;

          // get count from ResultSet array
          const count = _array[0]["COUNT(*)"];

          resolve(count);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /** Create check_off table */
  static createTable = (): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `
            CREATE TABLE IF NOT EXISTS check_off (
                id TEXT NOT NULL PRIMARY KEY,
                user_id TEXT,
                feature_id TEXT,
                created_at INTEGER,
                updated_at INTEGER
            );
          `;

      executeSql(sqlStatement)
        .then((resultSet) => {
          resolve(resultSet);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /** Drop check_off table */
  static dropTable = (): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `DROP TABLE IF EXISTS check_off;`;

      executeSql(sqlStatement)
        .then((resultSet) => {
          resolve(resultSet);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /** Find all records in check_off table */
  static selectAll = (): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `SELECT * FROM check_off`;

      executeSql(sqlStatement)
        .then((resultSet) => {
          resolve(resultSet);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /** Find matching record in check_off table by collection of key value pairs */
  static selectWhere = (
    queryParams: Partial<ICheckOffRecord>
  ): Promise<SQLite.SQLResultSet> => {
    // convert params object into array of [key, value] pairs
    // construct query condition using each [key, value] pair
    const condition = Object.entries(queryParams)
      .map((queryParam) => {
        return `${queryParam[0]} = '${queryParam[1]}'`;
      })
      .join(" AND ");

    return new Promise((resolve, reject) => {
      const sqlStatement = `SELECT * FROM check_off WHERE ${condition}`;

      executeSql(sqlStatement)
        .then((resultSet) => {
          resolve(resultSet);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default CheckOff;

export {
  CheckOffDocument,
  CheckOffQuery,
  CheckOffProperty,
  ICheckOffDocument,
  ICheckOffRecord,
};

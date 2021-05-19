import * as SQLite from "expo-sqlite";
import { executeSql } from "../database";
import { CheckOffProperty, ICheckOffRecord } from "./types";

class CheckOff {
  /** Create table */
  static createCheckOffTable = (): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `
            CREATE TABLE IF NOT EXISTS check_off (
                id TEXT,
                userId TEXT,
                featureId TEXT,
                createdAt INTEGER,
                updatedAt INTEGER
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

  /** Drop table */
  static dropCheckOffTable = (): Promise<SQLite.SQLResultSet> => {
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

  /** Find matching record by key value pair */
  static findWhere = (
    key: CheckOffProperty,
    value: string
  ): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `SELECT * FROM check_off WHERE ${key}="${value}"`;

      executeSql(sqlStatement)
        .then((resultSet) => {
          resolve(resultSet);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /** Create new record */
  static create = (payload: ICheckOffRecord): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `
        INSERT INTO check_off (
          id,
          userId,
          featureId,
          createdAt,
          updatedAt
        ) VALUES (
          ?,?,?,?,?
        );
      `;

      const args = [
        payload.id,
        payload.userId,
        payload.featureId,
        payload.createdAt,
        payload.updatedAt,
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
}

export default CheckOff;

export { CheckOffProperty, ICheckOffRecord };

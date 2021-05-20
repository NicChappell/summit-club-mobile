import * as SQLite from "expo-sqlite";
import { executeSql } from "../database";
import { CheckOffProperty, ICheckOffRecord } from "./types";

class CheckOff {
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

  /** Insert new record into check_off table */
  static insert = (payload: ICheckOffRecord): Promise<SQLite.SQLResultSet> => {
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

  /** Create check_off table */
  static createCheckOffTable = (): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `
            CREATE TABLE IF NOT EXISTS check_off (
                id TEXT NOT NULL PRIMARY KEY,
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

  /** Drop check_off table */
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

  /** Find matching record in check_off table by collection of key value pairs */
  static findWhere = (
    queryParams: Partial<ICheckOffRecord>
  ): Promise<SQLite.SQLResultSet> => {
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

export { CheckOffProperty, ICheckOffRecord };

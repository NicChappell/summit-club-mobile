import * as SQLite from "expo-sqlite";
import { executeSql } from "../database";

class CheckIn {
  /** Create table */
  static createFeatureTable = (): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `
        CREATE TABLE IF NOT EXISTS feature (
          class TEXT,
          continent TEXT,
          country TEXT,
          county TEXT,
          feet INTEGER,
          id INTEGER,
          latitude REAL,
          longitude REAL,
          meters INTEGER,
          name TEXT,
          state TEXT
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
}

export default CheckIn;

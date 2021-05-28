import * as SQLite from "expo-sqlite";

// open or create the database
export const database = SQLite.openDatabase("summit_club");

// asynchronous sqlite transaction wrapper
export const executeSql = (
  sqlStatement: string,
  args: (string | number)[] = []
): Promise<SQLite.SQLResultSet> => {
  return new Promise((resolve, reject) => {
    // new database transaction
    database.transaction((tx) => {
      // execute sql statement
      tx.executeSql(
        // sql statement
        sqlStatement,
        // arguments
        [...args],
        // success callback
        (_tx: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
          resolve(resultSet);
        },
        // error callback
        (_tx: SQLite.SQLTransaction, error: SQLite.SQLError) => {
          reject(error);

          // typescript expects a return boolean
          return true;
        }
      );
    });
  });
};

/** A SQLite result set */
export type ResultSet = SQLite.SQLResultSet;

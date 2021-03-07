import * as SQLite from "expo-sqlite";

// asynchronous sqlite transaction wrapper function
export const executeSql = async (
  featuresDatabase: SQLite.WebSQLDatabase,
  sqlStatement: string,
  args: string[] = []
) => {
  return new Promise((resolve, reject) => {
    // new database transaction
    featuresDatabase.transaction((tx) => {
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

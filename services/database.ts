import * as SQLite from "expo-sqlite";

// open or create the database
const Database = SQLite.openDatabase("summit_club");

// asynchronous sqlite transaction wrapper
// TODO: DELETE EXISTING FUNCTION DEFINITION
// TOTO: REPLACE EXISTING INVOCATIONS WITH THIS UPDATED FUNCTION
export const executeSql = (
  sqlStatement: string,
  args: string[] = []
): Promise<SQLite.SQLResultSet> => {
  return new Promise((resolve, reject) => {
    // new database transaction
    Database.transaction((tx) => {
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

export default Database;

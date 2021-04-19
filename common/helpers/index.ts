import * as SQLite from "expo-sqlite";
import { featurePhotos } from "../images/features";

// asynchronous sqlite transaction wrapper function
// TODO CAN PROBABLY DELETE THIS IN FAVOR OF EQUIVALENT SERVICE FUNCTION
export const executeSql = async (
  featuresDatabase: SQLite.WebSQLDatabase,
  sqlStatement: string,
  args: string[] = []
): Promise<SQLite.SQLResultSet> => {
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

export const getFeaturePhoto = (name: string) => {
  // find target feature in collection of selected features with photos
  const feature = Object.values(featurePhotos).find(
    (feature) => feature.name === name
  );

  if (feature) {
    // return feature photo if found
    return feature.photo;
  }

  // return null by default
  return null;
};

// USD currency formatter.
export const usdCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

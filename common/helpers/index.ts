import * as SQLite from "expo-sqlite";
import { featurePhotos } from "../images/features";

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

export const getFeaturePhoto = (name: string) => {
  // find target feature in collection of selected features with photos
  const feature = Object.values(featurePhotos).find(
    (feature) => feature.name === name
  );

  if (feature) {
    // return feature photo if available
    return feature.photo;
  } else {
    // else return placeholder image
    return { uri: "https://picsum.photos/1760/880" };
  }
};

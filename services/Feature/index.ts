import { executeSql, ResultSet } from "../database";
import { featuresCollectionRef } from "../Firebase";
import { processFeature, processFeatureCollection } from "./helpers";
import {
  FeatureClassification,
  FeatureDocument,
  FeatureProperty,
  IFeatureRecord,
} from "./types";

class Feature {
  /** Count feature table rows */
  static countRows = (): Promise<number> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `SELECT COUNT(*) FROM feature;`;

      executeSql(sqlStatement)
        .then((resultSet) => {
          // destructure result set
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

  /** Create feature table */
  static createTable = (): Promise<ResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `
        CREATE TABLE IF NOT EXISTS feature (
          class TEXT,
          continent TEXT,
          country TEXT,
          county TEXT,
          feet INTEGER,
          id TEXT,
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

  /** Drop feature table */
  static dropTable = (): Promise<ResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `DROP TABLE IF EXISTS feature;`;

      executeSql(sqlStatement)
        .then((resultSet) => {
          resolve(resultSet);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /** Populate feature table */
  static populateFeatureTable = (
    documents: FeatureDocument[]
  ): Promise<number> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStatement = `
          INSERT INTO feature (
            class,
            continent,
            country,
            county,
            feet,
            id,
            latitude,
            longitude,
            meters,
            name,
            state
          ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,?
          );
        `;

        // count successful database transactions
        let count = 0;

        // wait for all database transactions to finish
        for (const document of documents) {
          // destructure properties from document
          const { properties } = document;

          // format arguments
          const args = [
            properties.class,
            properties.continent,
            properties.country,
            properties.county,
            properties.feet,
            properties.id,
            properties.latitude,
            properties.longitude,
            properties.meters,
            properties.name,
            properties.state,
          ];

          await executeSql(sqlStatement, args);

          // update count
          count += 1;
        }

        resolve(count);
      } catch (error) {
        reject(error);
      }
    });
  };

  /** Retrieve feature records from firestore */
  static retreiveFeatureDocuments = (): Promise<FeatureDocument[]> => {
    return new Promise((resolve, reject) => {
      // execute firestore query
      featuresCollectionRef
        .where("properties.class", "==", "Summit")
        .get()
        .then((snapshot) => {
          // collect firestore documents
          const documents: FeatureDocument[] = [];

          snapshot.forEach((doc) => {
            // retrieve all document fields as an object
            // NOTE: each document is equivalent to a Feature object
            const document = doc.data();

            // add document id to feature properties
            document.properties.id = doc.id;

            // push document into documents array
            documents.push(document);
          });

          resolve(documents);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /** Find matching records in feature table */
  static selectWhereIn = (
    column: FeatureProperty,
    values: any[]
  ): Promise<ResultSet> => {
    return new Promise((resolve, reject) => {
      // format query condition
      const condition = values.map((value) => `'${value}'`).join(",");

      const sqlStatement = `
        SELECT *
        FROM feature
        WHERE ${column}
        IN (${condition})
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

export default Feature;

export {
  FeatureClassification,
  FeatureDocument,
  FeatureProperty,
  IFeatureRecord,
  processFeature,
  processFeatureCollection,
};

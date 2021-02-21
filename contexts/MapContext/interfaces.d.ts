import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { Feature } from "geojson";

export interface IMapContext {
  /** SQLite Database */
  database?: SQLite.WebSQLDatabase;
  /** Asynchronous SQLite transaction wrapper function */
  executeSql?: (
    database: SQLite.WebSQLDatabase,
    sqlStatement: string,
    args: string[] = []
  ) => Promise;
  /** Selected feature data */
  feature?: Feature;
  /** Currently available features */
  features?: Feature[];
  /** Firestore collection reference */
  featuresRef?: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  /** Function that updates feature value */
  setFeature: (feature?: Feature) => void;
  /** Function that updates features value */
  setFeatures: (features?: Feature[]) => void;
}

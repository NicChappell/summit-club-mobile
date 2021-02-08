import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { ISQLResult } from "../../../common/interfaces";

export interface IMapContext {
  /** SQLite Database */
  database?: SQLite.WebSQLDatabase;
  /** Selected feature data */
  feature?: ISQLResult;
  /** Currently available features */
  features?: ISQLResult[];
  /** Firestore collection reference */
  featuresRef?: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  /** Function that updates feature value */
  setFeature: (feature: ISQLResult) => void;
  /** Function that updates features value */
  setFeatures: (features: ISQLResult[]) => void;
}

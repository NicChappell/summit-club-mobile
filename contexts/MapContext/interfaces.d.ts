import { WebSQLDatabase } from "expo-sqlite";
import { Feature } from "geojson";

export interface IMapContext {
  /** TODO */
  database?: WebSQLDatabase;
  /** TODO */
  feature?: Feature;
  /** TODO */
  openDatabase: () => Promise<WebSQLDatabase>;
  /** TODO */
  setDatabase: (database: WebSQLDatabase) => void;
  /** TODO */
  setFeature: (feature: ISQLResult) => void;
}

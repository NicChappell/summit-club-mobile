import * as SQLite from "expo-sqlite";

export interface IDatabaseState {
  /** SQLite database */
  database?: SQLite.WebSQLDatabase;
}

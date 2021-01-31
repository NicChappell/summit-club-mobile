import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

// filepath to SQLite database asset
const db = require("../../../data/fourteeners.db");

export const openDatabase = async () => {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }

  await FileSystem.downloadAsync(
    Asset.fromModule(db).uri,
    FileSystem.documentDirectory + "SQLite/summits.db"
  );

  const database = SQLite.openDatabase("summits.db");

  return database;
};

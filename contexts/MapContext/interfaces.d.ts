import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { Feature, Geometry, GeoJsonProperties, Point } from "geojson";

export interface IMapContext {
  /** SQLite Database */
  featuresDatabase?: SQLite.WebSQLDatabase;
  /** Selected feature data */
  feature?: Feature<Geometry, GeoJsonProperties>;
  /** Currently available features */
  features?: Feature<Geometry, GeoJsonProperties>[];
  /** Firestore collection reference */
  featuresCollectionRef?: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  /** Function that updates feature value */
  setFeature: (feature?: Feature) => void;
  /** Function that updates features value */
  setFeatures: (features?: Feature[]) => void;
}

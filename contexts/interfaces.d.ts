import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { Feature, Geometry, GeoJsonProperties, Point } from "geojson";

export type ElevationTier =
  | "above14"
  | "between13and14"
  | "between12and13"
  | "between11and12"
  | "between10and11"
  | "below10";

export interface IExploreFilter {}

export interface IFeatureContext {
  /** Selected feature data */
  feature?: Feature<Geometry, GeoJsonProperties>;
  /** Filter conditions for database queries */
  featureFilters?: IExploreFilter | IMapFilter;
  /** Currently available features */
  features?: Feature<Geometry, GeoJsonProperties>[];
  /** SQLite database */
  featuresDatabase?: SQLite.WebSQLDatabase;
  /** Firestore collection reference */
  featuresCollectionRef?: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  /** Function that updates feature value */
  setFeature: (
    feature: Dispatch<SetStateAction<Feature<Geometry, GeoJsonProperties>>>
  ) => void;
  /** Function that updates features filter */
  setFeatureFilters: (
    featureFilters: Dispatch<SetStateAction<IExploreFilter | IMapFilter>>
  ) => void;
  /** Function that updates features value */
  setFeatures: (
    features: Dispatch<SetStateAction<Feature<Geometry, GeoJsonProperties>[]>>
  ) => void;
}

export interface IMapFilter {
  /** Maximum summit elevation to return */
  maxElevation: number;
  /** Include summits with elvations above 14,000' */
  above14: boolean;
  /** Include summits with elvations between 13,000' and 14,000' */
  between13and14: boolean;
  /** Include summits with elvations between 12,000' and 13,000' */
  between12and13: boolean;
  /** Include summits with elvations between 11,000' and 12,000' */
  between11and12: boolean;
  /** Include summits with elvations between 10,000' and 11,000' */
  between10and11: boolean;
  /** Include summits with elvations below 10,000' */
  below10: boolean;
  /** Render counties overlay */
  countiesOverlay: boolean;
}

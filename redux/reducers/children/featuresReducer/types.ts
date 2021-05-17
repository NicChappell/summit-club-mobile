import firebase from "firebase/app";
import "firebase/firestore";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { IFeatureFilters } from "../../../../common/types";

export interface IFeaturesState {
  /** Selected feature profile */
  feature?: Feature<Geometry, GeoJsonProperties>;
  /** Filter conditions for database queries */
  featureFilters?: IFeatureFilters;
  /** Currently available features */
  features?: Feature<Geometry, GeoJsonProperties>[];
  /** Firestore collection reference */
  featuresCollectionRef?: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
}

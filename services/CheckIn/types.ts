import firebase from "firebase/app";
import { FeatureClassification } from "../Feature";

export interface ICheckInDocument {
  /** Uniquely identifies the CheckIn document */
  id: string;
  /** Uniquely identifies a User document */
  userId: string;
  /** Uniquely identifies a Feature document */
  featureId: string;
  /** Timestamp when the document was created measured in milliseconds */
  createdAt: firebase.firestore.Timestamp;
}

export interface ICheckInRecord {
  /** Uniquely identifies the CheckIn record */
  id: string;
  /** Uniquely identifies a User record */
  user_id: string;
  /** Uniquely identifies a Feature record */
  feature_id: string;
  /** Timestamp when the record was created measured in milliseconds */
  created_at: number;
}

export interface ICheckInResult {
  /** Feature class definition */
  class: FeatureClassification;
  /** Name of a continent */
  continent: "North America";
  /** Name of a country */
  country: "United States";
  /** The name for a county or county equivalent  */
  county: string;
  /** Timestamp when the record was created measured in milliseconds */
  created_at: number;
  /** Uniquely identifies a Feature record */
  feature_id: string;
  /** Elevation in feet above (-below) sea level of the feature at the primary coordinates */
  feet: number;
  /** Uniquely identifies the CheckIn record */
  id: string;
  /** The official latitude coordinate of the feature location */
  latitude: number;
  /** The official longitude coordinate of the feature location */
  longitude: number;
  /** Elevation in meters above (-below) sea level of the feature at the primary coordinates */
  meters: number;
  /** Permanent, official feature name */
  name: string;
  /** The unique two letter alphabetic code for a US State */
  state: string;
  /** Uniquely identifies a User record */
  user_id: string;
}

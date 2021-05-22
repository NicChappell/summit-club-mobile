export type CheckInProperty = "id" | "user_id" | "feature_id" | "created_at";

export interface ICheckInRecord {
  /** Uniquely identifies the Check In record */
  id: string;
  /** Uniquely identifies a User record */
  user_id: string;
  /** Uniquely identifies a Feature record */
  feature_id: string;
  /** Timestamp when the record was created measured in milliseconds */
  created_at: number;
}

export type CheckInProperty =
  | "id"
  | "userId"
  | "featureId"
  | "createdAt"
  | "updatedAt";

export interface ICheckInRecord {
  /** Uniquely identifies the Check In record */
  id: string;
  /** Uniquely identifies a User record */
  userId: string;
  /** Uniquely identifies a Feature record */
  featureId: string;
  /** Timestamp when the record was created measured in milliseconds */
  createdAt: number;
  /** Timestamp when the record was last updated measured in milliseconds */
  updatedAt: number;
}

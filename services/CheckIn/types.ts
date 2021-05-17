export type CheckInProperty =
  | "id"
  | "userId"
  | "featureId"
  | "createdAt"
  | "updatedAt";

export interface ICheckInRecord {
  /** Uniquely identifies the record */
  id: string;
  /** Uniquely identifies a User record */
  userId: string;
  /** Uniquely identifies a Feature record */
  featureId: string;
  /** Timestamp when the record was created measured in milliseconds since the Epoch */
  createdAt: number;
  /** Timestamp when the record was last updated measured in milliseconds since the Epoch */
  updatedAt: number;
}

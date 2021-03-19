export interface ICheckIn {
  /** Check-in ID */
  id: string;
  /** User ID */
  userId: string;
  /** Feature profile */
  featureId: string;
  /** Array of timestamps */
  checkIns: Date[];
  /** Timestamp */
  checkOff: Date;
}

class CheckIn {
  /** Fetch array of User's check-in data */
  static get(): Promise<ICheckIn[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: "0",
          userId: "1",
          featureId: "0",
          checkIns: [new Date()],
          checkOff: new Date(),
        },
        {
          id: "1",
          userId: "1",
          featureId: "0",
          checkIns: [new Date()],
          checkOff: new Date(),
        },
        {
          id: "2",
          userId: "1",
          featureId: "0",
          checkIns: [new Date()],
          checkOff: new Date(),
        },
        {
          id: "3",
          userId: "1",
          featureId: "0",
          checkIns: [new Date()],
          checkOff: new Date(),
        },
        {
          id: "4",
          userId: "1",
          featureId: "0",
          checkIns: [new Date()],
          checkOff: new Date(),
        },
        {
          id: "5",
          userId: "1",
          featureId: "0",
          checkIns: [new Date()],
          checkOff: new Date(),
        },
      ]);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }
}

export default CheckIn;

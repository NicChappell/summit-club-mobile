export interface IClassification {
  /** Uniquely identifies the Classification record */
  id: number;
  /** Name of the Classification */
  name: string;
  /** Description of the Classification */
  description: string;
  /** Array of Feature IDs */
  features: number[];
}

class Classification {
  /** Fetch list of Classifications */
  static getClassifications(): Promise<IClassification[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: 0,
          name: "Class 1",
          description: "Walking an established flat, easy trail.",
          features: [1, 2, 3, 4, 5],
        },
        {
          id: 1,
          name: "Class 2",
          description:
            "Hiking a steep incline, scrambling, maybe using your hands.",
          features: [1, 2, 3, 4],
        },
        {
          id: 2,
          name: "Class 3",
          description:
            "Climbing a steep hillside, moderate exposure, a rope may be carried but not used, and hands are used in climbing. A short fall could be possible.",
          features: [1, 2, 3],
        },
        {
          id: 3,
          name: "Class 4",
          description:
            "It is steeper yet, exposed and most people use a rope due to the potential of long falls.",
          features: [1, 2],
        },
        {
          id: 4,
          name: "Class 5",
          description:
            "Climbing is technical and belayed roping with protection is required. It is not for a novice. Any fall from a Class 5 could be fatal.",
          features: [1],
        },
      ]);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }
}

export default Classification;

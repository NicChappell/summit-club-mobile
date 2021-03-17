export type CollectionType = "range";

export interface ICollection {
  /** Uniquely identifies the Collection */
  id: number;
  /** Name of the Collection */
  name: string;
  /** Type of the Collection */
  type: CollectionType;
  /** Description of the Collection */
  description: string;
  /** Array of Feature IDs */
  features: number[];
}

class Collection {
  /** Fetch list of Collections */
  static get(): Promise<ICollection[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: 0,
          name: "Elk Mountains",
          type: "range",
          description:
            "The Elk Mountains is a subrange of the Rocky Mountains located in west-central Colorado",
          features: [1, 2, 3, 4, 5],
        },
        {
          id: 1,
          name: "Front Range",
          type: "range",
          description:
            "The Front Range is a subrange of the Rocky Mountains located in central Colorado and southeastern Wyoming",
          features: [1, 2, 3, 4],
        },
        {
          id: 2,
          name: "Mosquito Range",
          type: "range",
          description:
            "The Mosquito Range is a subrange of the Rocky Mountains located in central Colorado",
          features: [1, 2, 3],
        },
        {
          id: 3,
          name: "San Juan Mountains",
          type: "range",
          description:
            "The San Juan Mountains is a subrange of the Rocky Mountains located in southwestern Colorado and northwestern New Mexico",
          features: [1, 2],
        },
        {
          id: 4,
          name: "Sangre de Cristo",
          type: "range",
          description:
            "The Sangre de Cristo Mountains are the southernmost subrange of the Rocky Mountains located in southern Colorado and northern New Mexico",
          features: [1],
        },
        {
          id: 5,
          name: "Sawatch Range",
          type: "range",
          description:
            "The Sawatch Range is a subrange of the Rocky Mountains located in central Colorado",
          features: [1],
        },
        {
          id: 6,
          name: "Tenmile Range",
          type: "range",
          description:
            "The Tenmile Range is a subrange of the Rocky Mountains and an extension of the Mosquito Range located in central Colorado",
          features: [1],
        },
      ]);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }
}

export default Collection;

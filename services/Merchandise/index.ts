export type ApparelType =
  | "T-Shirt"
  | "Premium T-Shirt"
  | "V-Neck T-Shirt"
  | "Tank Top"
  | "Long Sleeve T-Shirt"
  | "Raglan"
  | "Sweatshirt"
  | "Pullover Hoodie"
  | "Zip Hoodie";

export type ApparelColor =
  | "Asphalt"
  | "Baby Blue"
  | "Black"
  | "Cranberry"
  | "Heather Grey"
  | "Kelly Green"
  | "Lemon"
  | "Navy"
  | "Olive"
  | "Orange"
  | "Pink"
  | "Purple"
  | "Red"
  | "Royal"
  | "White"
  | "Brown"
  | "Dark Heather"
  | "Grass"
  | "Heather Blue"
  | "Silver"
  | "Slate"
  | "Forest Green"
  | "Sapphire"
  | "Neon Pink"
  | "Black/Athletic Heather"
  | "Black/White"
  | "Dark Heather/White"
  | "Navy/Athletic Heather"
  | "Navy/White"
  | "Red/White"
  | "Royal Blue/White";

export type ApparelSize =
  | "Small"
  | "Medium"
  | "Large"
  | "XL"
  | "2XL"
  | "3XL"
  | "Kids 2"
  | "Kids 3"
  | "Kids 4"
  | "Kids 6"
  | "Kids 8"
  | "Kids 10"
  | "Kids 12"
  | "Unisex Small"
  | "Unisex Medium"
  | "Unisex Large"
  | "Unisex XL"
  | "Unisex 2XL";

export type ApparelFit = "Men" | "Women" | "Youth" | "Unisex";

export interface IApparelVersion {
  /** Uniquely identifies the version */
  id: number;
  /** The version's photo */
  photo: string;
  /** The version's fit */
  fit: ApparelFit;
  /** The version's color */
  color: ApparelColor;
}

export interface IApparel {
  /** Uniquely identifies the product */
  id: number;
  /** Uniquely identifies the associated Feature */
  featureId: number;
  /** Title of the product */
  title: string;
  /** Type of the product */
  type: ApparelType;
  /** Description of the product */
  description: string;
  /** Price of the product */
  price: number;
  /** Versions of the product */
  versions: IApparelVersion[];
}

class Merchandise {
  /** Fetch list of ApparelType */
  static getApparel(): Promise<IApparel[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: 0,
          featureId: 0,
          title: "I Climbed Longs Peak",
          type: "T-Shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          price: 19.99,
          versions: [
            {
              id: 0,
              photo: "https://picsum.photos/id/200/800/600",
              fit: "Men",
              color: "Heather Grey",
            },
            {
              id: 1,
              photo: "https://picsum.photos/id/201/800/600",
              fit: "Men",
              color: "White",
            },
            {
              id: 2,
              photo: "https://picsum.photos/id/202/800/600",
              fit: "Women",
              color: "Heather Grey",
            },
            {
              id: 3,
              photo: "https://picsum.photos/id/203/800/600",
              fit: "Women",
              color: "White",
            },
            {
              id: 4,
              photo: "https://picsum.photos/id/204/800/600",
              fit: "Youth",
              color: "Heather Grey",
            },
            {
              id: 5,
              photo: "https://picsum.photos/id/205/800/600",
              fit: "Youth",
              color: "White",
            },
          ],
        },
        {
          id: 1,
          featureId: 1,
          title: "I Climbed Longs Peak",
          type: "Premium T-Shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          price: 19.99,
          versions: [
            {
              id: 0,
              photo: "https://picsum.photos/id/200/800/600",
              fit: "Men",
              color: "Heather Grey",
            },
            {
              id: 1,
              photo: "https://picsum.photos/id/201/800/600",
              fit: "Men",
              color: "White",
            },
            {
              id: 2,
              photo: "https://picsum.photos/id/202/800/600",
              fit: "Women",
              color: "Heather Grey",
            },
            {
              id: 3,
              photo: "https://picsum.photos/id/203/800/600",
              fit: "Women",
              color: "White",
            },
            {
              id: 4,
              photo: "https://picsum.photos/id/204/800/600",
              fit: "Youth",
              color: "Heather Grey",
            },
            {
              id: 5,
              photo: "https://picsum.photos/id/205/800/600",
              fit: "Youth",
              color: "White",
            },
          ],
        },
        {
          id: 2,
          featureId: 1,
          title: "I Climbed Longs Peak",
          type: "Long Sleeve T-Shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          price: 19.99,
          versions: [
            {
              id: 0,
              photo: "https://picsum.photos/id/200/800/600",
              fit: "Unisex",
              color: "Heather Grey",
            },
            {
              id: 1,
              photo: "https://picsum.photos/id/201/800/600",
              fit: "Unisex",
              color: "White",
            },
          ],
        },
        {
          id: 3,
          featureId: 2,
          title: "I Climbed Longs Peak",
          type: "Raglan",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          price: 19.99,
          versions: [
            {
              id: 0,
              photo: "https://picsum.photos/id/200/800/600",
              fit: "Men",
              color: "Heather Grey",
            },
            {
              id: 1,
              photo: "https://picsum.photos/id/201/800/600",
              fit: "Men",
              color: "White",
            },
            {
              id: 2,
              photo: "https://picsum.photos/id/202/800/600",
              fit: "Women",
              color: "Heather Grey",
            },
            {
              id: 3,
              photo: "https://picsum.photos/id/203/800/600",
              fit: "Women",
              color: "White",
            },
          ],
        },
        {
          id: 4,
          featureId: 3,
          title: "I Climbed Longs Peak",
          type: "V-Neck T-Shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          price: 19.99,
          versions: [
            {
              id: 0,
              photo: "https://picsum.photos/id/202/800/600",
              fit: "Women",
              color: "Heather Grey",
            },
            {
              id: 1,
              photo: "https://picsum.photos/id/203/800/600",
              fit: "Women",
              color: "White",
            },
          ],
        },
        {
          id: 5,
          featureId: 4,
          title: "I Climbed Longs Peak",
          type: "Pullover Hoodie",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          price: 19.99,
          versions: [
            {
              id: 0,
              photo: "https://picsum.photos/id/200/800/600",
              fit: "Unisex",
              color: "Heather Grey",
            },
            {
              id: 1,
              photo: "https://picsum.photos/id/201/800/600",
              fit: "Unisex",
              color: "White",
            },
          ],
        },
      ]);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }
}

export default Merchandise;

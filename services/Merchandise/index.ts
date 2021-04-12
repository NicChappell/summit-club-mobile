export type ApparelType =
  | "standard-t-shirt"
  | "premium-t-shirt"
  | "v-neck-t-shirt"
  | "tank-top"
  | "long-sleeve-t-shirt"
  | "raglan"
  | "sweatshirt"
  | "pullover-hoodie"
  | "zip-hoodie";

export type ColorName =
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

export type Size =
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

export type Fit = "Men" | "Women" | "Youth" | "Unisex";

export interface IVersion {
  /** The version's photo */
  photo: string;
  /** The version's fit */
  fit: Fit;
  /** The version's color */
  color: ColorName;
  /** The version's price */
  price: number;
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
  /** Versions of the product */
  versions: IVersion[];
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
          type: "standard-t-shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          versions: [
            {
              photo: "https://picsum.photos/800/600",
              fit: "Men",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Men",
              color: "White",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Women",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Women",
              color: "White",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Youth",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Youth",
              color: "White",
              price: 19.99,
            },
          ],
        },
        {
          id: 1,
          featureId: 1,
          title: "I Climbed Longs Peak",
          type: "standard-t-shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          versions: [
            {
              photo: "https://picsum.photos/800/600",
              fit: "Men",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Men",
              color: "White",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Women",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Women",
              color: "White",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Youth",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Youth",
              color: "White",
              price: 19.99,
            },
          ],
        },
        {
          id: 2,
          featureId: 2,
          title: "I Climbed Longs Peak",
          type: "standard-t-shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          versions: [
            {
              photo: "https://picsum.photos/800/600",
              fit: "Men",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Men",
              color: "White",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Women",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Women",
              color: "White",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Youth",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Youth",
              color: "White",
              price: 19.99,
            },
          ],
        },
        {
          id: 3,
          featureId: 3,
          title: "I Climbed Longs Peak",
          type: "standard-t-shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          versions: [
            {
              photo: "https://picsum.photos/800/600",
              fit: "Men",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Men",
              color: "White",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Women",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Women",
              color: "White",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Youth",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Youth",
              color: "White",
              price: 19.99,
            },
          ],
        },
        {
          id: 4,
          featureId: 4,
          title: "I Climbed Longs Peak",
          type: "standard-t-shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          versions: [
            {
              photo: "https://picsum.photos/800/600",
              fit: "Men",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Men",
              color: "White",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Women",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Women",
              color: "White",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Youth",
              color: "Heather Grey",
              price: 19.99,
            },
            {
              photo: "https://picsum.photos/800/600",
              fit: "Youth",
              color: "White",
              price: 19.99,
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

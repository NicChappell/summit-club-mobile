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

export type ColorType =
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

export type SizeType =
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

export type FitType = "Men" | "Women" | "Youth";

export interface IApparel {
  /** Uniquely identifies the Apparel item */
  id: number;
  /** Uniquely identifies the associated Feature */
  featureId: number;
  /** Display name of the Apparel item */
  name: string;
  /** Type of the Apparel item */
  type: ApparelType;
  /** Description of the Apparel item */
  description: string;
  /** Price of the Apparel item */
  price: number;
  /** Color options for the Apparel item */
  colors: ColorType[];
  /** Size options for the Apparel item */
  sizes: SizeType[];
  /** Fit options for the Apparel item */
  fits: FitType[];
}

class Merchandise {
  /** Fetch list of Apparel */
  static getApparel(): Promise<IApparel[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: 0,
          featureId: 0,
          name: "I Climbed Longs Peak",
          type: "standard-t-shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          price: 19.99,
          colors: [
            "Asphalt",
            "Baby Blue",
            "Black",
            "Cranberry",
            "Heather Grey",
            "Kelly Green",
            "Lemon",
            "Navy",
            "Olive",
            "Orange",
          ],
          sizes: [
            "Small",
            "Medium",
            "Large",
            "XL",
            "2XL",
            "3XL",
            "Kids 2",
            "Kids 3",
            "Kids 4",
            "Kids 6",
            "Kids 8",
            "Kids 10",
            "Kids 12",
          ],
          fits: ["Men", "Women", "Youth"],
        },
        {
          id: 1,
          featureId: 1,
          name: "I Climbed Longs Peak",
          type: "standard-t-shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          price: 19.99,
          colors: [
            "Asphalt",
            "Baby Blue",
            "Black",
            "Cranberry",
            "Heather Grey",
            "Kelly Green",
            "Lemon",
            "Navy",
            "Olive",
            "Orange",
          ],
          sizes: [
            "Small",
            "Medium",
            "Large",
            "XL",
            "2XL",
            "3XL",
            "Kids 2",
            "Kids 3",
            "Kids 4",
            "Kids 6",
            "Kids 8",
            "Kids 10",
            "Kids 12",
          ],
          fits: ["Men", "Women", "Youth"],
        },
        {
          id: 2,
          featureId: 2,
          name: "I Climbed Longs Peak",
          type: "standard-t-shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          price: 19.99,
          colors: [
            "Asphalt",
            "Baby Blue",
            "Black",
            "Cranberry",
            "Heather Grey",
            "Kelly Green",
            "Lemon",
            "Navy",
            "Olive",
            "Orange",
          ],
          sizes: [
            "Small",
            "Medium",
            "Large",
            "XL",
            "2XL",
            "3XL",
            "Kids 2",
            "Kids 3",
            "Kids 4",
            "Kids 6",
            "Kids 8",
            "Kids 10",
            "Kids 12",
          ],
          fits: ["Men", "Women", "Youth"],
        },
        {
          id: 3,
          featureId: 3,
          name: "I Climbed Longs Peak",
          type: "standard-t-shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          price: 19.99,
          colors: [
            "Asphalt",
            "Baby Blue",
            "Black",
            "Cranberry",
            "Heather Grey",
            "Kelly Green",
            "Lemon",
            "Navy",
            "Olive",
            "Orange",
          ],
          sizes: [
            "Small",
            "Medium",
            "Large",
            "XL",
            "2XL",
            "3XL",
            "Kids 2",
            "Kids 3",
            "Kids 4",
            "Kids 6",
            "Kids 8",
            "Kids 10",
            "Kids 12",
          ],
          fits: ["Men", "Women", "Youth"],
        },
        {
          id: 4,
          featureId: 4,
          name: "I Climbed Longs Peak",
          type: "standard-t-shirt",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula velit sed sagittis rhoncus. In tellus metus, imperdiet vel mattis vel, porta vehicula sapien.",
          price: 19.99,
          colors: [
            "Asphalt",
            "Baby Blue",
            "Black",
            "Cranberry",
            "Heather Grey",
            "Kelly Green",
            "Lemon",
            "Navy",
            "Olive",
            "Orange",
          ],
          sizes: [
            "Small",
            "Medium",
            "Large",
            "XL",
            "2XL",
            "3XL",
            "Kids 2",
            "Kids 3",
            "Kids 4",
            "Kids 6",
            "Kids 8",
            "Kids 10",
            "Kids 12",
          ],
          fits: ["Men", "Women", "Youth"],
        },
      ]);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }
}

export default Merchandise;

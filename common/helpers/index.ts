import { featurePhotos } from "../images/features";

export const getFeaturePhoto = (name: string) => {
  // find target feature in collection of selected features with photos
  const feature = Object.values(featurePhotos).find(
    (feature) => feature.name === name
  );

  if (feature) {
    // return feature photo if found
    return feature.photo;
  }

  // return null by default
  return null;
};

// USD currency formatter.
export const usdCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

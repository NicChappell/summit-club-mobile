import { featurePhotos } from "./images/features";

export const getFeaturePhoto = (name: string) => {
  // find target feature in collection of selected features with photos
  const feature = Object.values(featurePhotos).find(
    (feature) => feature.name === name
  );

  if (feature) {
    // return feature photo if available
    return feature.photo;
  } else {
    // else return placeholder image
    return { uri: "https://picsum.photos/1760/880" };
  }
};

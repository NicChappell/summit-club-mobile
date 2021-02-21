import { Feature } from "geojson";

export const MockFeature: Feature = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-105.6162397, 40.2548614],
  },
  properties: {
    feet: 14262,
    meters: 4347,
    latitude: 40.2548614,
    longitude: -105.6162397,
    name: "Longs Peak",
    class: "Summit",
    county: "Boulder",
    state: "CO",
    country: "United States",
    continent: "North America",
  },
};

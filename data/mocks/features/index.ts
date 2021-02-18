import { Feature } from "geojson";

export const MockFeature: Feature = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-107.082, 39.1503],
  },
  properties: {
    feet: 14130,
    meters: 4307,
    latitude: 39.1503,
    longitude: -107.082,
    name: "Capitol Peak",
    regions: ["Rocky Mountains", "Elk Range Area"],
    states: ["Colorado"],
    countries: ["United States"],
    continent: "North America",
    "marker-size": "large",
    "marker-symbol": "triangle",
  },
};

import { Feature, Geometry, GeoJsonProperties } from "geojson";

export const MOCK_FEATURE: Feature<Geometry, GeoJsonProperties> = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-105.6162397, 40.2548614],
  },
  properties: {
    id: 123456789,
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

export const MOCK_FEATURES: Feature<Geometry, GeoJsonProperties>[] = [
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 1,
      name: "Britteny Beach",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 2,
      name: "Madie Vera",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 3,
      name: "Kris Mcgill",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 4,
      name: "Ardath Taggart",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 5,
      name: "Daisey Wenzel",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 6,
      name: "Florance Toler",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 7,
      name: "Alyse Vue",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 8,
      name: "Dusti Cleveland",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 9,
      name: "Maurine Meehan",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 10,
      name: "Fredricka Sipes",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 11,
      name: "Machelle Hester",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 12,
      name: "Troy Wray",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 13,
      name: "Kerrie Provost",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 14,
      name: "Ivory Fulmer",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 15,
      name: "Mia Salmon",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 16,
      name: "Sulema Noland",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 17,
      name: "Janae Hein",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 18,
      name: "Denis Battle",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 19,
      name: "Jc Beauregard",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 20,
      name: "Rhea Kaminski",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 21,
      name: "Iona Kline",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 22,
      name: "Felica Weeks",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 23,
      name: "Jaymie Varner",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 24,
      name: "Nicolle Frost",
    },
  },
  {
    ...MOCK_FEATURE,
    properties: {
      ...MOCK_FEATURE.properties,
      id: 25,
      name: "Ok Sotelo",
    },
  },
];

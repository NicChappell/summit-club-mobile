import { Region } from "react-native-maps";
import { IMapBoundaries } from "../../common/interfaces";

// Custom map style
export const customMapStyle = [
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

// The initial map boundaries to query against
export const initialMapBoundaries: IMapBoundaries = {
  northEast: {
    latitude: 41.003906 + 1, // northeast latitude coordinate +1°
    longitude: -102.042974 + 1, // northeast longitude coordinate +1°
  },
  southWest: {
    latitude: 36.994786 - 1, // southwest latitude coordinate -1°
    longitude: -109.058934 - 1, // southwest longitude coordinate -1°
  },
};

// The initial region to be displayed by the map
export const initialRegion: Region = {
  latitude: 39.331557, // center latitude coordinate
  longitude: -105.5704935, // center longitude coordinate
  latitudeDelta: 8.75, // north-to-south distance (measured in degrees) to display on the map
  longitudeDelta: 7.5, // east-to-west distance (measured in degrees) to display on the map
};

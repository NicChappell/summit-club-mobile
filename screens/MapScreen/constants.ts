import { Region } from "react-native-maps";
import { IMapBoundaries } from "../../common/interfaces";

// The initial map boundaries to query against
export const initialMapBoundaries: IMapBoundaries = {
  northEast: {
    latitude: 41.003906 + 1,
    longitude: -102.042974 + 1,
  },
  southWest: {
    latitude: 36.994786 - 1,
    longitude: -109.058934 - 1,
  },
};

// The initial region to be displayed by the map
export const initialRegion: Region = {
  latitude: 39.113014,
  longitude: -105.358887,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MapStackParamList } from "../../navigation/navigators/MapStack/types";

export type MapScreenNavigationProp = StackNavigationProp<
  MapStackParamList,
  "Map"
>;

export type MapScreenRouteProp = RouteProp<MapStackParamList, "Map">;

export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type Camera = {
  center: {
    latitude: number;
    longitude: number;
  };
  pitch: number;
  heading: number;

  // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
  altitude: number;

  // Only when using Google Maps.
  zoom: number;
};

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Location = {
  latitude: number;
  longitude: number;
  altitude: number;
  timestamp: number; //Milliseconds since Unix epoch
  accuracy: number;
  altitudeAccuracy: number;
  speed: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Frame = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum MapType {
  "standard",
  "satellite",
  "hybrid",
  "terrain", //Android only
}

export type EdgePadding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type EdgeInsets = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export type Marker = {
  id: string;
  coordinate: LatLng;
  title: string;
  description: string;
};

export type KmlContainer = {
  markers: [Marker];
};

export type IndoorBuilding = {
  underground: boolean;
  activeLevelIndex: number;
  levels: Array<IndoorLevel>;
};

export type IndoorLevel = {
  index: number;
  name: string;
  shortName: string;
};

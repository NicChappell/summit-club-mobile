export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type Camera = {
  center?: {
    latitude: number;
    longitude: number;
  };
  pitch?: number;
  heading?: number;
  zoom?: number;
};

export type LatLng = {
  latitude: number;
  longitude: number;
};

// export type Location = {
//   latitude: number;
//   longitude: number;
//   altitude: number;
//   timestamp: number; //Milliseconds since Unix epoch
//   accuracy: number;
//   altitudeAccuracy: number;
//   speed: number;
// };

// export type Point = {
//   x: number;
//   y: number;
// };

// export type Frame = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// };

// export enum MapType {
//   "standard",
//   "satellite",
//   "hybrid",
//   "terrain", //Android only
// }

// export type EdgePadding = {
//   top: number;
//   right: number;
//   bottom: number;
//   left: number;
// };

// export type EdgeInsets = {
//   top: number;
//   left: number;
//   bottom: number;
//   right: number;
// };

// export type Marker = {
//   id: string;
//   coordinate: LatLng;
//   title: string;
//   description: string;
// };

// export type KmlContainer = {
//   markers: [Marker];
// };

// export type IndoorBuilding = {
//   underground: boolean;
//   activeLevelIndex: number;
//   levels: Array<IndoorLevel>;
// };

// export type IndoorLevel = {
//   index: number;
//   name: string;
//   shortName: string;
// };

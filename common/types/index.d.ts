export type Region = {
  /** The center point latitude coordinate of the new region */
  latitude: number;
  /** The center point longitude coordinate of the new region */
  longitude: number;
  /** The amount of north-to-south distance (measured in degrees) to display on the map */
  latitudeDelta: number;
  /** The amount of east-to-west distance (measured in degrees) to display on the map */
  longitudeDelta: number;
};

// export type Camera = {
//   center?: {
//     latitude: number;
//     longitude: number;
//   };
//   pitch?: number;
//   heading?: number;
//   zoom?: number;
// };

export type LatLng = {
  /** The latitude coordinate for a map marker */
  latitude: number;
  /** The longitude coordinate for a map marker */
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

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { MainTabsParamList } from '../../navigation/navigators/MainTabs/types';

export type MapScreenNavigationProp = BottomTabNavigationProp<
    MainTabsParamList,
    'Map'
>;

export type MapScreenRouteProp = RouteProp<MainTabsParamList, 'Map'>;

export type Region = {
    latitude: Number,
    longitude: Number,
    latitudeDelta: Number,
    longitudeDelta: Number
};

export type Camera = {
    center: {
        latitude: number,
        longitude: number,
    },
    pitch: number,
    heading: number,

    // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
    altitude: number,

    // Only when using Google Maps.
    zoom: number
};

export type LatLng = {
    latitude: Number,
    longitude: Number
};

export type Location = {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    timestamp: Number, //Milliseconds since Unix epoch
    accuracy: Number,
    altitudeAccuracy: Number,
    speed: Number
};

export type Point = {
    x: Number,
    y: Number,
};

export type Frame = {
    x: Number,
    y: Number,
    width: Number,
    height: Number
};

export enum MapType {
    "standard",
    "satellite",
    "hybrid",
    "terrain" //Android only
};

export type EdgePadding = {
    top: Number,
    right: Number,
    bottom: Number,
    left: Number
};

export type EdgeInsets = {
    top: Number,
    left: Number,
    bottom: Number,
    right: Number
};

export type Marker = {
    id: String,
    coordinate: LatLng,
    title: String,
    description: String
};

export type KmlContainer = {
    markers: [Marker]
};

export type IndoorBuilding = {
    underground: boolean,
    activeLevelIndex: Number,
    levels: Array<IndoorLevel>
};

export type IndoorLevel = {
    index: Number,
    name: String,
    shortName: String
};

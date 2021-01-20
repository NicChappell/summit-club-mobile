import { FeatureCollection } from 'geojson';
import {
    MapScreenNavigationProp,
    MapScreenRouteProp
} from './types';

export interface IMapScreen {
    /** TODO */
    navigation: MapScreenNavigationProp;
    /** TODO */
    route: MapScreenRouteProp;
};

export interface IMarkers {
    /** TODO */
    featureCollection: FeatureCollection | undefined;
};

export interface ISQLResult {
    /** TODO */
    difficulty: string;
    /** TODO */
    distanceMiles: number;
    /** TODO */
    elevationFeet: number;
    /** TODO */
    elevationGainFeet: number;
    /** TODO */
    fourteener: boolean;
    /** TODO */
    latitude: number;
    /** TODO */
    longitude: number;
    /** TODO */
    mountainPeak: string;
    /** TODO */
    mountainRange: string;
    /** TODO */
    photo: string;
};

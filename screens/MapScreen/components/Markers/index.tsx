import React from 'react';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { Feature } from 'geojson';
import { IMarkers } from '../../interfaces';
import * as MapTypes from '../../types';

const Markers = ({ featureCollection }: IMarkers) => {
    // return null until feature colleciton is set
    if (!featureCollection) {
        return null;
    }

    // destructure props
    const { features } = featureCollection;

    const markers = features.map((feature: Feature, index: number) => {
        // destructure feature
        const geometry: any = feature.geometry;
        const properties: any = feature.properties;

        const coordinate: MapTypes.LatLng = {
            latitude: parseFloat(geometry.coordinates[1]),
            longitude: parseFloat(geometry.coordinates[0])
        };

        return (
            <Marker
                key={index}
                coordinate={coordinate}
                title={properties.mountainPeak}
                description={properties.elevationFeet}
            />
        );
    });

    return (
        <>
            {markers}
        </>
    );
};

export default Markers;

const styles = StyleSheet.create({});

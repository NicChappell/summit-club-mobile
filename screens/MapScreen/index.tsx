import React, {
    useEffect,
    useState
} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
    SafeAreaView
} from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import { IMapScreen, ISQLResult } from './interfaces';

import { openDatabase } from './helpers';
import * as helpers from '@turf/helpers';

import { Markers } from './components';

// MapView types
import { Region } from './types';
import { Feature, FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

const MapScreen = ({ navigation, route }: IMapScreen) => {
    // state hooks
    const [database, setDatabase] = useState<SQLite.WebSQLDatabase | undefined>(undefined);
    const [featureCollection, setFeatureCollection] = useState<FeatureCollection | undefined>(undefined);
    const [region, setRegion] = useState<Region>({
        latitude: 39.113014,
        longitude: -105.358887,
        latitudeDelta: 5,
        longitudeDelta: 5
    });

    // effect hooks
    useEffect(() => {
        openDatabase()
            .then(database => {
                setDatabase(database);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (database) {
            database.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM fourteeners;`,
                    [],
                    (_: SQLite.SQLTransaction, ResultSet: SQLite.SQLResultSet) => processResultSet(ResultSet)
                );
            });
        }
    }, [database]);

    const handleRegionChange = (region: Region) => setRegion(region);

    const processResultSet = (ResultSet: SQLite.SQLResultSet) => {
        // destructure ResultSet
        const { _array } = ResultSet.rows;

        const features = _array.map((result: ISQLResult) => {
            const geometry: Geometry = {
                "type": "Point",
                "coordinates": [result.longitude, result.latitude]
            };

            const properties: GeoJsonProperties = { ...result };

            const feature: Feature = helpers.feature(geometry, properties);

            return feature;
        });

        const featureCollection: FeatureCollection = helpers.featureCollection(features);

        setFeatureCollection(featureCollection);
    };

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                // onRegionChange={handleRegionChange}
                region={region}
                style={styles.map}
            >
                <Markers featureCollection={featureCollection} />
            </MapView>
        </SafeAreaView>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

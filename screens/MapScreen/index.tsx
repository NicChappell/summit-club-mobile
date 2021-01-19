import React, {
    useEffect,
    useState
} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
import {
    SafeAreaView
} from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { IMapScreen } from './interfaces';

import * as helpers from '@turf/helpers';

// filepath to SQLite database asset
const db = require('./data/fourteeners.db');

// MapView types
import { Region } from './types';
import { Feature, FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

const MapScreen = ({ navigation, route }: IMapScreen) => {
    // state hooks
    const [database, setDatabase] = useState<SQLite.WebSQLDatabase | undefined>(undefined);
    const [featureCollection, setFeatureCollection] = useState<FeatureCollection | undefined>(undefined);
    console.log(featureCollection);
    const [region, setRegion] = useState<Region>({
        latitude: 39.113014,
        longitude: -105.358887,
        latitudeDelta: 5,
        longitudeDelta: 5
    });

    // effect hooks
    useEffect(() => {
        openDatabase()
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

    const openDatabase = async () => {
        if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
        }
        await FileSystem.downloadAsync(
            Asset.fromModule(db).uri,
            FileSystem.documentDirectory + 'SQLite/summits.db'
        );
        const database = SQLite.openDatabase('summits.db');
        setDatabase(database);
    };

    const processResultSet = (ResultSet: SQLite.SQLResultSet) => {
        // destructure ResultSet
        const { _array } = ResultSet.rows;

        const features = _array.map(result => {
            const geometry: Geometry = {
                "type": "Point",
                "coordinates": [result.longitude, result.latitude]
            };

            const properties: GeoJsonProperties = { ...result };

            const feature: Feature = helpers.feature(geometry, properties);

            return feature;
        })

        const featureCollection: FeatureCollection = helpers.featureCollection(features);

        setFeatureCollection(featureCollection);
    };

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                onRegionChange={handleRegionChange}
                region={region}
                style={styles.map}
            />
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

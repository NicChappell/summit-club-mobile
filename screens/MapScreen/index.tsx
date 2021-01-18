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
import { IMapScreen } from './interfaces';

import * as SQLite from 'expo-sqlite';
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const db = require('./data/fourteeners.db');

const MapScreen = ({ navigation, route }: IMapScreen) => {
    // state hooks
    const [isMapReady, setIsMapReady] = useState<boolean>(false);
    const [database, setDatabase] = useState<SQLite.WebSQLDatabase | undefined>(undefined);
    console.log(database);

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
                    (_, { rows: { _array } }) => console.log(_array)
                );
            });
        }
    }, [database]);

    async function openDatabase() {
        if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
        }
        await FileSystem.downloadAsync(
            Asset.fromModule(db).uri,
            FileSystem.documentDirectory + 'SQLite/summits.db'
        );
        const database = SQLite.openDatabase('summits.db');
        setDatabase(database);
    }

    const handleMapReady = () => setIsMapReady(true);

    if (!isMapReady) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                onMapReady={handleMapReady}
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

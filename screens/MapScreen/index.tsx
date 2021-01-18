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

const MapScreen = ({ navigation, route }: IMapScreen) => {
    // state hooks
    const [isMapReady, setIsMapReady] = useState(false);

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

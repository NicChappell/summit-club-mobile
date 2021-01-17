import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import * as actions from '../../actions';
import { HomeTabsParamList } from '../../navigation/navigators/HomeTabs';
import { RootState } from '../../reducers';

type HomeScreenNavigationProp = BottomTabNavigationProp<
    HomeTabsParamList,
    'Home'
>;
type HomeScreenRouteProp = RouteProp<HomeTabsParamList, 'Home'>;

interface IHomeScreen {
    /** TODO */
    navigation: HomeScreenNavigationProp;
    /** TODO */
    resetTour: () => void;
    /** TODO */
    route: HomeScreenRouteProp;
    /** TODO */
    signOut: () => void;
};

// import { AuthContext } from '../App';

const HomeScreen = ({ navigation, resetTour, route, signOut }: IHomeScreen) => {
    // const { signOut } = React.useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <Text>This is top text.</Text>
            <View>
                <Text>HomeScreen</Text>
                <Button title="Reset tour" onPress={resetTour} />
                <Button title="Sign out" onPress={signOut} />
            </View>
            <Text>This is bottom text.</Text>
        </SafeAreaView>
    );
};

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = {
    resetTour: actions.resetTour,
    signOut: actions.signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
});

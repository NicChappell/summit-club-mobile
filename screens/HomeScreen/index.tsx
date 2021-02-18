import React from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import { useFonts, NotoSansJP_700Bold } from "@expo-google-fonts/noto-sans-jp";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import { HERO_IMAGE } from "../../common/images";
import { colors, input, shadow } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { FeaturedLandmarks, RecentCheckIns } from "./components";
import { IHomeScreen } from "./interfaces";

type Props = PropsFromRedux & IHomeScreen;

const HomeScreen = ({
  error,
  navigation,
  resetTour,
  route,
  signOut,
}: Props) => {
  // font hooks
  useFonts({ NotoSansJP_700Bold });

  const insets = useSafeAreaInsets();

  return (
    <DismissKeyboard>
      <ScrollView style={[styles.container]}>
        <StatusBar barStyle="dark-content" />
        <ErrorOverlay error={error} />

        <View style={styles.heroContainer}>
          <ImageBackground
            source={HERO_IMAGE}
            style={[styles.heroImageBackground, { paddingTop: insets.top }]}
          >
            <Text h3 style={styles.heroTitle}>
              Find your{"\n"}
              next adventure
            </Text>
            <Input
              inputContainerStyle={styles.heroInputContainer}
              leftIcon={
                <Ionicons name={"ios-search"} size={24} color={colors.black} />
              }
              placeholder="Search landmarks"
            />
          </ImageBackground>
        </View>
        <View style={styles.section}>
          <Text h4 style={styles.sectionTitle}>
            Featured landmarks
          </Text>
          <View style={styles.featuredLandmarks}>
            <FeaturedLandmarks />
          </View>
        </View>
        <View style={styles.section}>
          <Text h4 style={styles.sectionTitle}>
            Check-ins
          </Text>
          <View style={styles.recentCheckIns}>
            <RecentCheckIns />
          </View>
        </View>
        <Text>This is top text.</Text>
        <View>
          <Text>HomeScreen</Text>
          <Button title="Reset tour" onPress={resetTour} />
          <Button title="Sign out" onPress={signOut} />
        </View>
        <Text>This is bottom text.</Text>
      </ScrollView>
    </DismissKeyboard>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {
  resetTour: actions.resetTour,
  signOut: actions.signOut,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  featuredLandmarks: {
    height: 128,
  },
  heroContainer: {
    height: 192,
    marginBottom: 24,
    width: "100%",
  },
  heroInputContainer: {
    ...input,
    ...shadow,
    marginBottom: -input.height,
  },
  heroImageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
  },
  heroTitle: {
    color: colors.white,
    fontFamily: "NotoSansJP_700Bold",
    padding: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: -1,
    },
  },
  recentCheckIns: {
    height: 192,
  },
  section: {
    padding: 8,
  },
  sectionTitle: {
    fontFamily: "NotoSansJP_700Bold",
  },
});

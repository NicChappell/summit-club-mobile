import React from "react";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import { useFonts, NotoSansJP_700Bold } from "@expo-google-fonts/noto-sans-jp";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { FeaturedLandmarks } from "./components";
import { IHomeScreen, IFeaturedLandmarkSlide } from "./interfaces";

type Props = PropsFromRedux & IHomeScreen;

const SLIDE_DATA: IFeaturedLandmarkSlide[] = [
  { id: "0", title: "Mt Lorem", image: "https://picsum.photos/512" },
  { id: "1", title: "Mt Ipsum", image: "https://picsum.photos/512" },
  { id: "2", title: "Mt Dolar", image: "https://picsum.photos/512" },
  { id: "3", title: "Mt Sit", image: "https://picsum.photos/512" },
  { id: "4", title: "Mt Amet", image: "https://picsum.photos/512" },
];

const HomeScreen = ({ navigation, resetTour, route, signOut }: Props) => {
  // font hooks
  useFonts({ NotoSansJP_700Bold });

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.heroContainer}>
        <ImageBackground
          source={{ uri: "https://picsum.photos/1024" }}
          style={[styles.heroImageBackground, { paddingTop: insets.top }]}
        >
          <Text h3 style={styles.heroTitle}>
            Find your next adventure
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
      <Text>This is top text.</Text>
      <View>
        <Text>HomeScreen</Text>
        <Button title="Reset tour" onPress={resetTour} />
        <Button title="Sign out" onPress={signOut} />
      </View>
      <View style={styles.section}>
        <Text h3 style={styles.sectionTitle}>
          Featured landmarks
        </Text>
        <View style={styles.featuredLandmarks}>
          <FeaturedLandmarks data={SLIDE_DATA} />
        </View>
      </View>
      <Text>This is bottom text.</Text>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
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
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
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
    backgroundColor: colors.white,
    borderRadius: 4,
    height: 48,
    paddingHorizontal: 4,
    marginBottom: -48,
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: -1,
    },
  },
  heroImageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
  },
  heroTitle: {
    color: colors.white,
    fontFamily: "NotoSansJP_700Bold",
    paddingHorizontal: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: -1,
    },
  },
  section: {
    padding: 8,
  },
  sectionTitle: {
    fontFamily: "NotoSansJP_700Bold",
  },
});

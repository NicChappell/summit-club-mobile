import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
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

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is top text.</Text>
      <View>
        <Text>HomeScreen</Text>
        <Button title="Reset tour" onPress={resetTour} />
        <Button title="Sign out" onPress={signOut} />
      </View>
      <View style={styles.section}>
        <Text h3 style={styles.sectionTitle}>
          Featured Landmarks
        </Text>
        <View style={styles.featuredLandmarks}>
          <FeaturedLandmarks data={SLIDE_DATA} />
        </View>
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
  section: {
    padding: 8,
  },
  sectionTitle: {
    fontFamily: "NotoSansJP_700Bold",
  },
});

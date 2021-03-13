import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "../../redux/actions";
import TourSlides from "./components/TourSlides";
import { ITourScreen } from "./interfaces";

type Props = PropsFromRedux & ITourScreen;

interface ITourSlide {
  /** uniquely identifies the slide */
  id: number;
  /** the slide's text content */
  text: string;
  /** the slide's background color */
  color: string;
}

const SLIDE_DATA: ITourSlide[] = [
  { id: 0, text: "Welcome to Summit Club", color: "#03A9F4" },
  { id: 1, text: "Hit the trails", color: "#009688" },
  { id: 2, text: "Adventure awaits", color: "#9F403A" },
];

const TourScreen = ({ completeTour, navigation, route }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TourSlides data={SLIDE_DATA} onComplete={completeTour} />
    </SafeAreaView>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = { completeTour: actions.completeTour };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TourScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import {
  BasicDetailsCard,
  DismissKeyboard,
  ErrorOverlay,
  FullDetailsCard,
} from "../../common/components";
import { colors } from "../../common/styles";
import { RootState } from "../../redux/reducers";
import { RecentCheckIns } from "./components";
import { IHomeScreen } from "./interfaces";

type Props = PropsFromRedux & IHomeScreen;

const HomeScreen = ({ error, navigation, route }: Props) => (
  <DismissKeyboard>
    <ScrollView style={styles.scrollView}>
      <ErrorOverlay error={error} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured summits</Text>
        <BasicDetailsCard navigation={navigation} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent check-ins</Text>
        <RecentCheckIns />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular summits</Text>
        <FullDetailsCard navigation={navigation} />
      </View>
    </ScrollView>
  </DismissKeyboard>
);

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomeScreen);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
  section: {
    marginBottom: 24,
    padding: 8,
  },
  sectionTitle: {
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
  },
});

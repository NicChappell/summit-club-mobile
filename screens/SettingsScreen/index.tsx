import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { ISettingsScreen } from "./types";

type Props = PropsFromRedux & ISettingsScreen;

const SettingsScreen = ({ error, navigation, resetTour, route }: Props) => {
  return (
    <DismissKeyboard>
      <ScrollView style={styles.scrollView}>
        <ErrorOverlay error={error} />
        <View style={styles.container}>
          <Text style={styles.header}>Settings</Text>
          <Button
            buttonStyle={styles.disabledButton}
            containerStyle={styles.buttonContainer}
            onPress={resetTour}
            title="Reset tour"
            titleStyle={styles.disabledButtonTitle}
          />
        </View>
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
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SettingsScreen);

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "flex-start",
    marginHorizontal: 8,
  },
  container: {
    padding: 16,
  },
  disabledButton: {
    backgroundColor: colors.queenBlue,
  },
  disabledButtonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  header: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
    marginBottom: 16,
    marginHorizontal: 8,
  },
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

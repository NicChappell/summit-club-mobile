import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { ErrorOverlay } from "../../../common/components";
import { colors } from "../../../common/styles";
import { RootState } from "../../../redux/reducers";
import { IAppLoading } from "./types";

type Props = PropsFromRedux & IAppLoading;

const AppLoading = ({ error }: Props) => {
  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <Text>AppLoading</Text>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AppLoading);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
  },
});

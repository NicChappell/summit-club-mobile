import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { ErrorOverlay } from "../../common/components";
import { colors } from "../../common/styles";
import { RootState } from "../../redux/reducers";
import { IBlankScreen } from "./interfaces";

type Props = PropsFromRedux & IBlankScreen;

const BlankScreen = ({ error, navigation, route }: Props) => {
  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <Text>This is top text.</Text>
      <View>
        <Text>BlankScreen</Text>
      </View>
      <Text>This is bottom text.</Text>
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

export default connector(BlankScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
});

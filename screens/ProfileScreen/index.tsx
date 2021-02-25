import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect, ConnectedProps } from "react-redux";
import { ErrorOverlay } from "../../common/components";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { IProfileScreen } from "./interfaces";

type Props = PropsFromRedux & IProfileScreen;

const ProfileScreen = ({
  error,
  navigation,
  resetTour,
  route,
  signOut,
}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ErrorOverlay error={error} />
      <Text>This is top text.</Text>
      <View>
        <Text>ProfileScreen</Text>
        <Button
          title="Go to Reset Password"
          onPress={() => navigation.navigate("ResetPassword")}
        />
      </View>
      <View>
        <Button title="Reset tour" onPress={resetTour} />
        <Button title="Sign out" onPress={signOut} />
      </View>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
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

export default connector(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },
});

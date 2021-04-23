import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import {
  borderRadius4,
  colors,
  inputBorder,
  inputContainer,
  inputStyle,
  paddingReset,
} from "../../../../common/styles";
import * as actions from "../../../../redux/actions";
import { RootState } from "../../../../redux/reducers";
import { ISignOutOverlay } from "./interfaces";

type Props = PropsFromRedux & ISignOutOverlay;

const SignOutOverlay = ({ setVisible, signOut, visible }: Props) => {
  return (
    <Overlay
      animationType="fade"
      backdropStyle={styles.backdrop}
      isVisible={visible}
      onBackdropPress={() => setVisible(!visible)}
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>
        <View style={styles.overlayTitle}>
          <Text style={styles.header}>Sign out</Text>
        </View>
        <View style={styles.overlayBody}>
          <Text style={styles.paragraph}>
            Are you sure you want to sign out?
          </Text>
        </View>
        <View style={styles.overlayFooter}>
          <Button
            buttonStyle={styles.cancelButton}
            containerStyle={styles.buttonContainer}
            onPress={() => setVisible(!visible)}
            title="Cancel"
            titleStyle={styles.buttonTitle}
          />
          <Button
            buttonStyle={styles.signOutButton}
            containerStyle={styles.buttonContainer}
            onPress={signOut}
            title="Sign out"
            titleStyle={styles.buttonTitle}
          />
        </View>
      </View>
    </Overlay>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

const mapDispatchToProps = { signOut: actions.signOut };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignOutOverlay);

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: colors.black25,
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    alignSelf: "flex-end",
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelButton: {
    ...borderRadius4,
    ...paddingReset,
    alignItems: "center",
    backgroundColor: colors.queenBlue,
    justifyContent: "center",
    marginRight: 16,
  },
  container: {
    alignItems: "stretch",
    justifyContent: "center",
  },
  header: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
  },
  input: {
    ...paddingReset,
    height: 48,
  },
  inputContainer: {
    ...inputBorder,
    ...inputContainer,
  },
  inputStyle: {
    ...inputStyle,
  },
  overlay: {
    ...borderRadius4,
    ...paddingReset,
    alignSelf: "stretch",
    margin: 16,
    overflow: "hidden",
  },
  overlayBody: {
    padding: 16,
  },
  overlayFooter: {
    alignItems: "center",
    borderTopColor: colors.black05,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  overlayTitle: {
    alignItems: "center",
    borderBottomColor: colors.black05,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 16,
  },
  paragraph: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 16,
  },
  signOutButton: {
    ...borderRadius4,
    ...paddingReset,
    alignItems: "center",
    backgroundColor: colors.pistachio,
    justifyContent: "center",
  },
});

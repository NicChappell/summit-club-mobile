import React, { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";
import { Button, Input, Overlay } from "react-native-elements";
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
import { IResetPasswordOverlay } from "./interfaces";

type Props = PropsFromRedux & IResetPasswordOverlay;

const ResetPasswordOverlay = ({ password, visible, setVisible }: Props) => {
  // state hooks
  const [disabled, setDisabled] = useState<boolean>(true);
  const [currentPasswordValue, setCurrentPasswordValue] = useState<string>("");
  const [newPasswordValue, setNewPasswordValue] = useState<string>("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");

  const handleCurrentPasswordChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    // destructure event
    const { text } = event.nativeEvent;

    // update state
    setCurrentPasswordValue(text);
  };

  const handleNewPasswordChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    // destructure event
    const { text } = event.nativeEvent;

    // update state
    setNewPasswordValue(text);
  };

  const handleConfirmPasswordChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    // destructure event
    const { text } = event.nativeEvent;

    // update state
    setConfirmPasswordValue(text);
  };

  return (
    <Overlay
      backdropStyle={styles.backdrop}
      isVisible={visible}
      onBackdropPress={() => setVisible(!visible)}
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>
        <View style={styles.overlayTitle}>
          <Text style={styles.header}>Reset password</Text>
        </View>
        <View style={styles.overlayBody}>
          <Input
            containerStyle={styles.input}
            inputContainerStyle={[
              styles.inputContainer,
              { backgroundColor: colors.black05 },
            ]}
            inputStyle={styles.inputStyle}
            label="Current password"
            labelStyle={styles.labelStyle}
            onChange={handleCurrentPasswordChange}
            secureTextEntry={true}
          />
          <Input
            containerStyle={styles.input}
            inputContainerStyle={[
              styles.inputContainer,
              { backgroundColor: colors.black05 },
            ]}
            inputStyle={styles.inputStyle}
            label="New password"
            labelStyle={styles.labelStyle}
            onChange={handleNewPasswordChange}
            secureTextEntry={true}
          />
          <Input
            containerStyle={styles.input}
            inputContainerStyle={[
              styles.inputContainer,
              { backgroundColor: colors.black05 },
            ]}
            inputStyle={styles.inputStyle}
            label="Confirm new password"
            labelStyle={styles.labelStyle}
            onChange={handleConfirmPasswordChange}
            secureTextEntry={true}
          />
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
            buttonStyle={styles.deleteButton}
            containerStyle={styles.buttonContainer}
            disabled={disabled}
            disabledStyle={styles.disabledButton}
            disabledTitleStyle={styles.buttonTitle}
            onPress={() => console.log("TODO")}
            title="Reset password"
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

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ResetPasswordOverlay);

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
  deleteButton: {
    ...paddingReset,
    alignItems: "center",
    backgroundColor: colors.pistachio,
    justifyContent: "center",
  },
  disabledButton: {
    ...paddingReset,
    backgroundColor: colors.pistachio50,
  },
  header: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
  },
  input: {
    ...paddingReset,
    height: 72,
    marginVertical: 8,
  },
  inputContainer: {
    ...inputBorder,
    ...inputContainer,
  },
  inputStyle: {
    ...inputStyle,
  },
  labelStyle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  overlay: {
    ...borderRadius4,
    ...paddingReset,
    alignSelf: "stretch",
    margin: 24,
    overflow: "hidden",
  },
  overlayBody: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  overlayBodyText: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 16,
    marginBottom: 8,
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
});

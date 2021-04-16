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
import { IDeleteAccountOverlay } from "./interfaces";

type Props = PropsFromRedux & IDeleteAccountOverlay;

const DeleteAccountOverlay = ({ username, visible, setVisible }: Props) => {
  // state hooks
  const [disabled, setDisabled] = useState<boolean>(true);
  const [usernameValue, setUsernameValue] = useState<string>("");

  // effect hooks
  useEffect(() => {
    setDisabled(username !== usernameValue);
  }, [usernameValue]);

  const handleUsernameChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    // destructure event
    const { text } = event.nativeEvent;

    // update state
    setUsernameValue(text);
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
          <Text style={styles.header}>Are you sure?</Text>
        </View>
        <View style={styles.overlayBody}>
          <Text style={styles.overlayBodyText}>
            This action cannot be undone. This will permenently delete your
            account and all associated data.
          </Text>
          <Text style={styles.overlayBodyText}>
            Confirm your username to continue:
          </Text>
          <Input
            containerStyle={{
              height: 48,
              ...paddingReset,
            }}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
            onChange={handleUsernameChange}
            placeholder={username}
            value={usernameValue}
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
            title="Delete account"
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

export default connector(DeleteAccountOverlay);

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    alignSelf: "flex-end",
  },
  cancelButton: {
    ...paddingReset,
    alignItems: "center",
    backgroundColor: colors.queenBlue,
    justifyContent: "center",
    marginRight: 16,
  },
  deleteButton: {
    ...paddingReset,
    alignItems: "center",
    backgroundColor: colors.redSalsa,
    justifyContent: "center",
  },
  disabledButton: {
    ...paddingReset,
    backgroundColor: colors.redSalsa25,
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  overlay: {
    ...borderRadius4,
    ...paddingReset,
    alignSelf: "stretch",
    margin: 24,
    overflow: "hidden",
  },
  overlayTitle: {
    alignItems: "center",
    borderBottomColor: colors.black05,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 16,
  },
  overlayBody: {
    padding: 16,
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
  inputContainer: {
    ...inputBorder,
    ...inputContainer,
  },
  inputStyle: {
    ...inputStyle,
  },
});

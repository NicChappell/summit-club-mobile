import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";
import { borderRadius4, colors, paddingReset } from "../../styles";
import { IErrorOverlay } from "./types";

type Props = PropsFromRedux & IErrorOverlay;

const ErrorOverlay = ({ error, clearError }: Props) => {
  // destructure error
  const { message } = error;

  // state hooks
  const [visible, setVisible] = useState<boolean>(false);

  // effect hooks
  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [error]);

  const closeOverlay = () => {
    clearError();
    setVisible(false);
  };

  return (
    <Overlay
      animationType="fade"
      backdropStyle={styles.backdrop}
      isVisible={visible}
      onBackdropPress={closeOverlay}
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>
        <View style={styles.overlayTitle}>
          <Text style={styles.header}>Uh-oh!</Text>
        </View>
        <View style={styles.overlayBody}>
          {message ? (
            <Text style={styles.paragraph}>{message}</Text>
          ) : (
            <Text style={styles.paragraph}>
              An error occurred, please try again later.
            </Text>
          )}
        </View>
        <View style={styles.overlayFooter}>
          <Button
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={() => setVisible(!visible)}
            title="Close"
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

const mapDispatchToProps = { clearError: actions.clearError };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ErrorOverlay);

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: colors.black25,
    flex: 1,
    justifyContent: "center",
  },
  button: {
    ...borderRadius4,
    ...paddingReset,
    alignItems: "center",
    backgroundColor: colors.queenBlue,
    justifyContent: "center",
    marginRight: 16,
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
});

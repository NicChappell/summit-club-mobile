import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "../../../store/actions";
import { RootState } from "../../../store/reducers";
import { colors } from "../../styles";
import { IErrorOverlay } from "./interfaces";

type Props = PropsFromRedux & IErrorOverlay;

const ErrorOverlay = ({ error, clearError }: Props) => {
  // state hooks
  const [visible, setVisible] = useState<boolean>(false);

  // effect hooks
  useEffect(() => {
    if (error.code || error.message) {
      setVisible(true);
    }
  }, [error]);

  const closeOverlay = () => {
    clearError();
    setVisible(false);
  };

  return (
    <Overlay
      backdropStyle={styles.backdrop}
      isVisible={visible}
      onBackdropPress={closeOverlay}
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          icon={<Ionicons name={"close"} size={24} color={colors.black} />}
          onPress={closeOverlay}
        />
        <Text style={styles.message}>{error.code}</Text>
        <Text style={styles.message}>{error.message}</Text>
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
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    alignSelf: "flex-end",
  },
  button: {
    alignItems: "center",
    backgroundColor: "transparent",
    height: 32,
    justifyContent: "center",
    padding: 0,
    width: 32,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    alignSelf: "stretch",
    margin: 32,
    padding: 16,
  },
  message: {
    color: colors.orangeRed,
    paddingBottom: 32,
    paddingHorizontal: 32,
  },
});

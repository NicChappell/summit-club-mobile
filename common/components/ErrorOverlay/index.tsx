import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../styles";
import { IErrorOverlay } from "./interfaces";

const ErrorOverlay = ({}: IErrorOverlay) => {
  // state hooks
  const [visible, setVisible] = useState<boolean>(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <Overlay
      backdropStyle={styles.backdrop}
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          icon={<Ionicons name={"close"} size={24} color={colors.black} />}
          onPress={toggleOverlay}
        />
        <Text style={styles.message}>There was an error</Text>
      </View>
    </Overlay>
  );
};

export default ErrorOverlay;

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
    // backgroundColor: colors.redSalsa,
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

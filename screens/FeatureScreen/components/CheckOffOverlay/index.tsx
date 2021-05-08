import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  borderRadius4,
  colors,
  paddingReset,
  paragraph,
} from "../../../../common/styles";
import { ICheckOffOverlay } from "./types";

const CheckOffOverlay = ({
  checkOff,
  feature,
  visible,
  setVisible,
}: ICheckOffOverlay) => {
  // destructure feature
  const {
    properties: { name },
  } = feature;

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
          <Button
            buttonStyle={{ ...paddingReset }}
            icon={
              <Ionicons name={"ios-close"} size={24} color={colors.queenBlue} />
            }
            onPress={() => setVisible(!visible)}
            type="clear"
          />
        </View>
        <View style={styles.overlayBody}>
          <Text style={paragraph}>
            {name} has been {checkOff ? "added to" : "removed from"} your
            Summits
          </Text>
        </View>
        <View style={styles.overlayFooter}>
          <Button
            buttonStyle={styles.closeButton}
            onPress={() => setVisible(!visible)}
            title="Close"
            titleStyle={styles.buttonTitle}
          />
        </View>
      </View>
    </Overlay>
  );
};

export default CheckOffOverlay;

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "flex-start",
    backgroundColor: colors.black25,
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeButton: {
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
    justifyContent: "flex-start",
    padding: 16,
  },
  overlayTitle: {
    alignItems: "center",
    borderBottomColor: colors.black05,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
});

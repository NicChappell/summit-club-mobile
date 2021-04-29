import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import { borderRadius4, colors, paddingReset } from "../../../../common/styles";
import { IIneligibleOverlay } from "./interfaces";

const IneligibleOverlay = ({
  distance,
  visible,
  setVisible,
}: IIneligibleOverlay) => {
  // convert distance to miles
  const miles = distance / 1.609;

  // set message
  let message = "";
  if (miles < 0.25) {
    message =
      "You're almost there! There's less than 0.25 miles to the summit.";
  } else if (miles < 0.5) {
    message = "Keep going! You're just 0.50 miles from the summit.";
  } else if (miles < 0.75) {
    message = "Getting closer! Only 0.75 miles to the summit.";
  } else if (miles < 1.0) {
    message = "The final stretch! The summit is less than 1 mile away.";
  } else {
    message = `You are ${distance.toFixed(2)} miles away from the summit.`;
  }

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
          <Text style={styles.header}>Ineligible</Text>
        </View>
        <View style={styles.overlayBody}>
          <Text style={styles.paragraph}>{message}</Text>
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

export default IneligibleOverlay;

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

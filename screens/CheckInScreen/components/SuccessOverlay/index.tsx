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
import { ISuccessOverlay } from "./types";

const SuccessOverlay = ({
  navigation,
  visible,
  setVisible,
}: ISuccessOverlay) => {
  const handlePress = () => {
    // lift state
    setVisible(!visible);

    // navigate to Feature screen
    navigation.goBack();
  };

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
          <Text style={styles.header}>You did it!</Text>
        </View>
        <View style={styles.overlayBody}>
          <Ionicons
            name={"ios-shield-checkmark-outline"}
            size={128}
            color={colors.queenBlue}
            style={{ alignSelf: "center" }}
          />
          <Text style={paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget
            ante cursus, dictum ligula ac, euismod nibh.
          </Text>
        </View>
        <View style={styles.overlayFooter}>
          <Button
            buttonStyle={styles.closeButton}
            onPress={handlePress}
            title="Close"
            titleStyle={styles.buttonTitle}
          />
        </View>
      </View>
    </Overlay>
  );
};

export default SuccessOverlay;

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
});

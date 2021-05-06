import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { CalloutMapBackground } from "../../../../common/components";
import { borderRadius4, colors, paddingReset } from "../../../../common/styles";
import * as actions from "../../../../redux/actions";
import { RootState } from "../../../../redux/reducers";
import { ICheckInOverlay } from "./types";

import { MOCK_FEATURE } from "../../../../data/mocks";

type Props = PropsFromRedux & ICheckInOverlay;

const CheckInOverlay = ({ visible, setVisible }: Props) => {
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
          <Text style={styles.header}>First Last</Text>
        </View>
        <View style={styles.overlayBody}>
          <CalloutMapBackground
            containerStyles={styles.imageContainer}
            feature={MOCK_FEATURE}
          />
        </View>
        <View style={styles.overlayFooter}>
          <Button
            buttonStyle={styles.closeButton}
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

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CheckInOverlay);

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
  imageContainer: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    height: 144,
    overflow: "hidden",
    width: "100%",
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
    marginBottom: 8,
  },
});

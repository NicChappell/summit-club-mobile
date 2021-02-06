import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Overlay, Text } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../styles";
import { ITermsAndConditions } from "./interfaces";

const TermsAndConditions = ({ visible, setVisible }: ITermsAndConditions) => {
  return (
    <Overlay
      backdropStyle={styles.backdrop}
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          icon={<Ionicons name={"close"} size={24} color={colors.black} />}
          onPress={() => setVisible(false)}
        />
        <ScrollView>
          <Text h4 style={styles.text}>
            Terms and Conditions
          </Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            varius elementum quam, in semper elit fringilla nec. Donec in dolor
            tortor. Nunc et consectetur magna. Cras mollis arcu massa. Integer
            vulputate sapien lacus, ac varius mauris facilisis commodo.
            Phasellus accumsan sodales pharetra. Maecenas varius turpis vel
            dolor pulvinar pretium.
          </Text>
          <Text style={styles.text}>
            Pellentesque ante augue, venenatis at mauris ut, suscipit
            pellentesque felis. Curabitur eleifend mi quis blandit sollicitudin.
            Cras tempus interdum venenatis. Nullam risus quam, porta ac
            sollicitudin sed, malesuada sed ipsum. Duis rutrum elementum elit,
            id tempus dui aliquet id. Pellentesque a rutrum metus.
          </Text>
          <Text style={styles.text}>
            Vestibulum aliquet arcu turpis, vel sollicitudin eros aliquam
            luctus. Nulla quis sodales lacus, vitae egestas urna. Nulla non
            eleifend nibh. Ut lacus mi, molestie eget scelerisque vitae,
            imperdiet ac diam. Interdum et malesuada fames ac ante ipsum primis
            in faucibus. Pellentesque habitant morbi tristique senectus et netus
            et malesuada fames ac turpis egestas.
          </Text>
        </ScrollView>
      </View>
    </Overlay>
  );
};

export default TermsAndConditions;

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
    marginHorizontal: 32,
    marginVertical: 96,
    paddingBottom: 64,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  text: {
    color: colors.black,
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
});

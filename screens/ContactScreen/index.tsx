import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import {
  colors,
  inputBorder,
  inputContainer,
  inputStyle,
} from "../../common/styles";
import { RootState } from "../../redux/reducers";
import { IContactScreen } from "./types";

type Props = PropsFromRedux & IContactScreen;

const ContactScreen = ({ error, navigation, route }: Props) => {
  // destructure route params
  const { contact } = route.params;

  if (!contact) {
    return null;
  }

  // state hooks
  const [disabled, setDisabled] = useState<boolean>(true);

  return (
    <DismissKeyboard>
      <ScrollView style={styles.scrollView}>
        <ErrorOverlay error={error} />
        <View style={styles.container}>
          <Text style={styles.header}>Contact</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Input
                disabled={disabled}
                inputContainerStyle={[
                  styles.inputContainer,
                  {
                    backgroundColor: disabled ? colors.black05 : colors.white,
                  },
                ]}
                inputStyle={styles.inputStyle}
                label="First Name"
                labelStyle={styles.labelStyle}
                value={contact.firstName}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                disabled={disabled}
                inputContainerStyle={[
                  styles.inputContainer,
                  {
                    backgroundColor: disabled ? colors.black05 : colors.white,
                  },
                ]}
                inputStyle={styles.inputStyle}
                label="Last Name"
                labelStyle={styles.labelStyle}
                value={contact.lastName}
              />
            </View>
          </View>
          <Input
            disabled={disabled}
            inputContainerStyle={[
              styles.inputContainer,
              {
                backgroundColor: disabled ? colors.black05 : colors.white,
              },
            ]}
            inputStyle={styles.inputStyle}
            label="Address Line 1"
            labelStyle={styles.labelStyle}
            value={contact.streetAddress1}
          />
          <Input
            disabled={disabled}
            inputContainerStyle={[
              styles.inputContainer,
              {
                backgroundColor: disabled ? colors.black05 : colors.white,
              },
            ]}
            inputStyle={styles.inputStyle}
            label="Address Line 2"
            labelStyle={styles.labelStyle}
            value={contact.streetAddress2}
          />
          <Input
            disabled={disabled}
            inputContainerStyle={[
              styles.inputContainer,
              {
                backgroundColor: disabled ? colors.black05 : colors.white,
              },
            ]}
            inputStyle={styles.inputStyle}
            label="City"
            labelStyle={styles.labelStyle}
            value={contact.city}
          />
          <View style={styles.row}>
            <View style={{ flex: 1.75 }}>
              <Input
                disabled={disabled}
                inputContainerStyle={[
                  styles.inputContainer,
                  {
                    backgroundColor: disabled ? colors.black05 : colors.white,
                  },
                ]}
                inputStyle={styles.inputStyle}
                label="State"
                labelStyle={styles.labelStyle}
                value={contact.province}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                disabled={disabled}
                inputContainerStyle={[
                  styles.inputContainer,
                  {
                    backgroundColor: disabled ? colors.black05 : colors.white,
                  },
                ]}
                inputStyle={styles.inputStyle}
                label="Postal Code"
                labelStyle={styles.labelStyle}
                value={contact.postalCode}
              />
            </View>
          </View>
          {disabled ? (
            <View style={styles.row}>
              <Button
                buttonStyle={styles.disabledButton}
                containerStyle={styles.buttonContainer}
                onPress={() => setDisabled(!disabled)}
                title="Update"
                titleStyle={styles.disabledButtonTitle}
              />
            </View>
          ) : (
            <View style={styles.row}>
              <Button
                buttonStyle={styles.saveButton}
                containerStyle={styles.buttonContainer}
                onPress={() => setDisabled(!disabled)}
                title="Save"
                titleStyle={styles.saveButtonTitle}
              />
              <Button
                buttonStyle={styles.cancelButton}
                containerStyle={styles.buttonContainer}
                onPress={() => setDisabled(!disabled)}
                title="Cancel"
                titleStyle={styles.cancelButtonTitle}
                type="outline"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ContactScreen);

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "flex-start",
    marginHorizontal: 8,
  },
  cancelButton: {
    borderColor: colors.queenBlue,
  },
  cancelButtonTitle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  container: {
    padding: 16,
  },
  disabledButton: {
    backgroundColor: colors.queenBlue,
  },
  disabledButtonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  header: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
    marginBottom: 16,
    marginHorizontal: 8,
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
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
  },
  saveButton: {
    backgroundColor: colors.pistachio,
  },
  saveButtonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import { colors, inputContainer } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { IProfileScreen } from "./interfaces";

type Props = PropsFromRedux & IProfileScreen;

const USER = {
  firstName: "Nic",
  lastName: "Chappell",
  address1: "971 Homer Circle",
  address2: "",
  city: "Lafayette",
  province: "CO",
  postalCode: "80026",
  username: "NC Hammer",
  password: "********",
};

const ProfileScreen = ({
  error,
  navigation,
  resetTour,
  route,
  signOut,
}: Props) => {
  // state hooks
  const [disabled, setDisabled] = useState<boolean>(true);

  return (
    <DismissKeyboard>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <ErrorOverlay error={error} />
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Contact</Text>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Input
                  disabled={disabled}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  label="First Name"
                  labelStyle={styles.labelStyle}
                  value={USER.firstName}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  disabled={disabled}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  label="Last Name"
                  labelStyle={styles.labelStyle}
                  value={USER.lastName}
                />
              </View>
            </View>
            <Input
              disabled={disabled}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              label="Address Line 1"
              labelStyle={styles.labelStyle}
              value={USER.address1}
            />
            <Input
              disabled={disabled}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              label="Address Line 2"
              labelStyle={styles.labelStyle}
              value={USER.address2}
            />
            <Input
              disabled={disabled}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              label="City"
              labelStyle={styles.labelStyle}
              value={USER.city}
            />
            <View style={styles.row}>
              <View style={{ flex: 1.75 }}>
                <Input
                  disabled={disabled}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  label="State"
                  labelStyle={styles.labelStyle}
                  value={USER.province}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  disabled={disabled}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  label="Postal Code"
                  labelStyle={styles.labelStyle}
                  value={USER.postalCode}
                />
              </View>
            </View>
            <Button
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              onPress={() => setDisabled(!disabled)}
              title="Update"
              titleStyle={styles.buttonTitle}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Account</Text>
            <Input
              disabled
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              label="Username"
              labelStyle={styles.labelStyle}
              placeholder={USER.username}
            />
            <Input
              disabled
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              label="Password"
              labelStyle={styles.labelStyle}
              placeholder={USER.password}
              secureTextEntry={true}
            />
            <Button
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              onPress={() => navigation.navigate("ResetPassword")}
              title="Reset password"
              titleStyle={styles.buttonTitle}
            />
          </View>
          <View style={styles.section}></View>
          {/* <View style={styles.row}>
            <Text>ProfileScreen</Text>
            <Button
              title="Go to Reset Password"
              onPress={() => navigation.navigate("ResetPassword")}
            />
          </View>
          <View style={styles.row}>
            <Button title="Reset tour" onPress={resetTour} />
            <Button title="Sign out" onPress={signOut} />
          </View> */}
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

const mapDispatchToProps = {
  resetTour: actions.resetTour,
  signOut: actions.signOut,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProfileScreen);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.queenBlue,
  },
  buttonContainer: {
    alignItems: "flex-start",
    marginHorizontal: 8,
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  container: {
    padding: 16,
  },
  divider: {
    borderBottomColor: colors.queenBlue25,
    borderBottomWidth: 1,
    paddingBottom: 40,
    marginBottom: 40,
    marginHorizontal: 8,
  },
  inputContainer: {
    ...inputContainer,
  },
  inputStyle: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 18,
  },
  labelStyle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    marginBottom: 4,
  },
  section: {},
  sectionHeader: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_700Bold",
    fontSize: 24,
    marginBottom: 16,
    marginHorizontal: 8,
  },
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
});

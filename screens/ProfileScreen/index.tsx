import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import { colors, input, shadow } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { IProfileScreen } from "./interfaces";

type Props = PropsFromRedux & IProfileScreen;

const DISABLED = true;

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
  return (
    <DismissKeyboard>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <ErrorOverlay error={error} />
          <View style={styles.section}>
            <Input
              disabled={DISABLED}
              inputContainerStyle={styles.inputContainer}
              label="Address Line 1"
              placeholder={USER.firstName}
            />
            <Input
              disabled={DISABLED}
              inputContainerStyle={styles.inputContainer}
              label="Address Line 2"
              placeholder={USER.lastName}
            />
            <Input
              disabled={DISABLED}
              inputContainerStyle={styles.inputContainer}
              label="City"
              placeholder={USER.address1}
            />
            <Input
              disabled={DISABLED}
              inputContainerStyle={styles.inputContainer}
              label="State/Province"
              placeholder={USER.address2}
            />
            <Input
              disabled={DISABLED}
              inputContainerStyle={styles.inputContainer}
              label="Postal Code"
              placeholder={USER.city}
            />
            <Input
              disabled={DISABLED}
              inputContainerStyle={styles.inputContainer}
              label="First Name"
              placeholder={USER.province}
            />
            <Input
              disabled={DISABLED}
              inputContainerStyle={styles.inputContainer}
              label="Last Name"
              placeholder={USER.postalCode}
            />
          </View>
          <View style={styles.section}>
            <Input
              disabled={DISABLED}
              inputContainerStyle={styles.inputContainer}
              label="Username"
              placeholder={USER.username}
            />
            <Input
              disabled={DISABLED}
              inputContainerStyle={styles.inputContainer}
              label="Password"
              placeholder={USER.password}
            />
          </View>
          <View style={styles.section}>
            <Text>ProfileScreen</Text>
            <Button
              title="Go to Reset Password"
              onPress={() => navigation.navigate("ResetPassword")}
            />
          </View>
          <View style={styles.section}>
            <Button title="Reset tour" onPress={resetTour} />
            <Button title="Sign out" onPress={signOut} />
          </View>
          <Text>This is bottom text.</Text>
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
  container: {
    alignItems: "center",
    backgroundColor: colors.pistachio,
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    ...input,
  },
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
  section: {
    alignSelf: "stretch",
    marginBottom: 24,
    padding: 8,
  },
});

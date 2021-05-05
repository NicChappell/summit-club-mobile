import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import {
  colors,
  inputBorder,
  inputContainer,
  inputStyle,
  paddingReset,
} from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import {
  ChangePasswordOverlay,
  DeleteAccountOverlay,
  SignOutOverlay,
} from "./components";
import { IAccountScreen } from "./types";

type Props = PropsFromRedux & IAccountScreen;

const AccountScreen = ({ error, navigation, route }: Props) => {
  // destructure route params
  const { account } = route.params;

  // state hooks
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
  const [isChangeVisible, setIsChangeVisible] = useState<boolean>(false);
  const [isSignOutVisible, setIsSignOutVisible] = useState<boolean>(false);

  return (
    <DismissKeyboard>
      <ScrollView style={styles.scrollView}>
        <DeleteAccountOverlay
          username={account.username}
          visible={isDeleteVisible}
          setVisible={setIsDeleteVisible}
        />
        <ChangePasswordOverlay
          password={account.password}
          visible={isChangeVisible}
          setVisible={setIsChangeVisible}
        />
        <SignOutOverlay
          visible={isSignOutVisible}
          setVisible={setIsSignOutVisible}
        />
        <ErrorOverlay error={error} />
        <View style={styles.container}>
          <Text style={styles.header}>Account</Text>
          <Input
            containerStyle={styles.input}
            disabled
            inputContainerStyle={[
              styles.inputContainer,
              { backgroundColor: colors.black05 },
            ]}
            inputStyle={styles.inputStyle}
            label="Username"
            labelStyle={styles.labelStyle}
            placeholder={account.username}
          />
          <Input
            containerStyle={styles.input}
            disabled
            inputContainerStyle={[
              styles.inputContainer,
              { backgroundColor: colors.black05 },
            ]}
            inputStyle={styles.inputStyle}
            label="Password"
            labelStyle={styles.labelStyle}
            placeholder={"••••••••"}
            secureTextEntry={true}
          />
          <Button
            buttonStyle={styles.changeButton}
            containerStyle={styles.buttonContainer}
            onPress={() => setIsChangeVisible(!isChangeVisible)}
            title="Change password"
            titleStyle={styles.changeButtonTitle}
          />
          <View style={styles.buttonGroup}>
            <Button
              buttonStyle={styles.signOutButton}
              containerStyle={styles.buttonContainer}
              onPress={() => setIsSignOutVisible(!isSignOutVisible)}
              title="Sign out"
              titleStyle={styles.signOutButtonTitle}
            />
            <Button
              buttonStyle={styles.deleteButton}
              containerStyle={styles.buttonContainer}
              onPress={() => setIsDeleteVisible(!isDeleteVisible)}
              title="Delete account"
              titleStyle={styles.deleteButtonTitle}
            />
          </View>
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

export default connector(AccountScreen);

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "flex-start",
    marginHorizontal: 8,
    marginTop: 16,
  },
  buttonGroup: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  changeButton: {
    ...paddingReset,
    backgroundColor: "transparent",
    marginTop: 8,
  },
  changeButtonTitle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  container: {
    padding: 16,
  },
  deleteButton: {
    ...paddingReset,
    backgroundColor: "transparent",
  },
  deleteButtonTitle: {
    color: colors.redSalsa50,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  header: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
    marginHorizontal: 8,
  },
  input: {
    ...paddingReset,
    height: 72,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 16,
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
    lineHeight: 20,
    marginBottom: 4,
  },
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
  signOutButton: {
    ...paddingReset,
    backgroundColor: "transparent",
  },
  signOutButtonTitle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
    paddingHorizontal: 8,
  },
});

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
} from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { DeleteAccountOverlay } from "./components";
import { IAccountScreen } from "./interfaces";

type Props = PropsFromRedux & IAccountScreen;

const AccountScreen = ({ error, navigation, route, signOut }: Props) => {
  // destructure route params
  const { account } = route.params;

  // state hooks
  const [disabled, setDisabled] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <DismissKeyboard>
      <ScrollView style={styles.scrollView}>
        <DeleteAccountOverlay
          username={account.username}
          visible={visible}
          setVisible={setVisible}
        />
        <ErrorOverlay error={error} />
        <View style={styles.container}>
          <Text style={styles.header}>Account</Text>
          <Input
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
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={() => console.log("TODO")}
            title="Reset password"
            titleStyle={styles.buttonTitle}
          />
          <Button
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={signOut}
            title="Sign out"
            titleStyle={styles.buttonTitle}
          />
          <Button
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={() => setVisible(!visible)}
            title="Delete account"
            titleStyle={styles.buttonTitle}
          />
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

const mapDispatchToProps = { signOut: actions.signOut };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AccountScreen);

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
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

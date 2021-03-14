import React, { useEffect, useState } from "react";
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
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { IAccountScreen } from "./interfaces";

import { IUser } from "../../services/User";
import { MOCK_USER } from "../../data/mocks";

type Props = PropsFromRedux & IAccountScreen;

const AccountScreen = ({ error, navigation, route, signOut }: Props) => {
  // state hooks
  const [user, setUser] = useState<IUser | undefined>(undefined);

  // effect hooks
  useEffect(() => {
    setUser(MOCK_USER);
  }, []);

  return (
    <DismissKeyboard>
      <ScrollView style={styles.scrollView}>
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
            placeholder={user?.account.username}
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
            buttonStyle={styles.disabledButton}
            containerStyle={styles.buttonContainer}
            onPress={() => console.log("TODO")}
            title="Reset password"
            titleStyle={styles.disabledButtonTitle}
          />
          <Button
            buttonStyle={styles.disabledButton}
            containerStyle={styles.buttonContainer}
            onPress={signOut}
            title="Sign out"
            titleStyle={styles.disabledButtonTitle}
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
  buttonContainer: {
    alignItems: "flex-start",
    marginHorizontal: 8,
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
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

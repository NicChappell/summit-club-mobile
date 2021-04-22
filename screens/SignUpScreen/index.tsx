import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, CheckBox, Input } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import { Formik } from "formik";
import * as actions from "../../redux/actions";
import {
  DismissKeyboard,
  ErrorOverlay,
  TermsAndConditions,
} from "../../common/components";
import { IAuthCredentials } from "../../common/interfaces";
import { signUpSchema } from "../../common/schemas";
import {
  borderRadius4,
  borderWidthReset,
  colors,
  inputBorder,
  inputContainer,
  inputStyle,
  paddingReset,
  marginReset,
  shadow,
  shadowReset,
} from "../../common/styles";
import { RootState } from "../../redux/reducers";
import { CheckBoxTitle } from "./components";
import { ISignUpScreen } from "./interfaces";

type Props = PropsFromRedux & ISignUpScreen;

const SignUpScreen = ({ error, navigation, route, signUp }: Props) => {
  // state hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [
    isTermsAndConditionsVisible,
    setIsTermsAndConditionsVisible,
  ] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  // effect hooks
  useEffect(() => {
    if (error) {
      // stop loading animation
      setIsLoading(false);
    }
  }, [error]);

  const handleSubmit = async (authCredentials: IAuthCredentials) => {
    // start loading animation
    setIsLoading(true);

    // submit auth credentials
    signUp(authCredentials);
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <ErrorOverlay error={error} />
        <TermsAndConditions
          visible={isTermsAndConditionsVisible}
          setVisible={setIsTermsAndConditionsVisible}
        />
        <Card
          containerStyle={styles.cardContainer}
          wrapperStyle={styles.cardWrapper}
        >
          <Formik
            validationSchema={signUpSchema}
            initialValues={{ email: "", password: "", terms: false }}
            onSubmit={handleSubmit}
          >
            {({
              dirty,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              setFieldValue,
              touched,
              values,
            }) => (
              <>
                <Input
                  autoCapitalize="none"
                  containerStyle={styles.input}
                  errorMessage={
                    errors.email && touched.email ? errors.email : undefined
                  }
                  errorStyle={styles.inputError}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  keyboardType="email-address"
                  label="Email"
                  labelStyle={styles.inputLabel}
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                  value={values.email}
                />
                <Input
                  autoCapitalize="none"
                  containerStyle={styles.input}
                  errorMessage={
                    errors.password && touched.password
                      ? errors.password
                      : undefined
                  }
                  errorStyle={styles.inputError}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  keyboardType="default"
                  label="Password"
                  labelStyle={styles.inputLabel}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  rightIcon={
                    <Ionicons
                      name={secureTextEntry ? "ios-eye-off" : "ios-eye"}
                      size={24}
                      color={colors.black75}
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                    />
                  }
                  rightIconContainerStyle={styles.rightIconContainer}
                  secureTextEntry={secureTextEntry}
                  value={values.password}
                />
                <CheckBox
                  title={
                    <CheckBoxTitle
                      setVisible={setIsTermsAndConditionsVisible}
                    />
                  }
                  checked={values.terms}
                  onIconPress={() => setFieldValue("terms", !values.terms)}
                />
                <Button
                  buttonStyle={styles.createAccountButton}
                  containerStyle={styles.createAccountButtonContainer}
                  disabled={!isValid || !dirty}
                  disabledStyle={styles.disabledButton}
                  disabledTitleStyle={styles.disabledButtonTitle}
                  title="Create account"
                  titleStyle={styles.createAccountButtonTitle}
                  loading={isLoading}
                  onPress={handleSubmit as any}
                />
              </>
            )}
          </Formik>
        </Card>
        <View style={styles.buttonGroup}>
          <Button
            buttonStyle={styles.clearButton}
            onPress={() => navigation.navigate("SignIn")}
            title="Sign in"
            titleStyle={styles.clearButtonTitle}
          />
          <Button
            buttonStyle={styles.clearButton}
            onPress={() => navigation.navigate("ForgotPassword")}
            title="Forgot password"
            titleStyle={styles.clearButtonTitle}
          />
        </View>
      </View>
    </DismissKeyboard>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = { signUp: actions.signUp };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignUpScreen);

const styles = StyleSheet.create({
  buttonGroup: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
  },
  clearButton: {
    ...borderRadius4,
    ...paddingReset,
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  clearButtonTitle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  container: {
    alignItems: "stretch",
    backgroundColor: colors.black01,
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  cardContainer: {
    ...borderWidthReset,
    ...marginReset,
    ...paddingReset,
    ...shadowReset,
    backgroundColor: "transparent",
    paddingBottom: 2,
    paddingLeft: 2,
  },
  cardWrapper: {
    ...borderRadius4,
    ...marginReset,
    ...paddingReset,
    ...shadow,
    backgroundColor: colors.white,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  createAccountButton: {
    ...borderRadius4,
    ...paddingReset,
    alignItems: "center",
    backgroundColor: colors.queenBlue,
    justifyContent: "center",
  },
  createAccountButtonContainer: {
    alignSelf: "flex-start",
    marginTop: 16,
  },
  createAccountButtonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  disabledButton: {
    ...borderRadius4,
    ...paddingReset,
    backgroundColor: colors.queenBlue50,
  },
  disabledButtonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    ...paddingReset,
    height: 80,
    marginBottom: 16,
  },
  inputContainer: {
    ...inputBorder,
    ...inputContainer,
  },
  inputError: {
    color: colors.orangeRed,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
    lineHeight: 16,
  },
  inputLabel: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    lineHeight: 20,
  },
  inputStyle: {
    ...inputStyle,
  },
  rightIconContainer: {
    ...marginReset,
    ...paddingReset,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, Input } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import { Formik } from "formik";
import * as actions from "../../redux/actions";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
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
import { ISignUpScreen } from "./interfaces";

type Props = PropsFromRedux & ISignUpScreen;

const SignUpScreen = ({ error, navigation, route, signUp }: Props) => {
  // state hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        <StatusBar barStyle="dark-content" />
        <ErrorOverlay error={error} />
        <View style={styles.top}>
          <View style={styles.section}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>
          <View style={styles.section}>
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
                  <Button
                    buttonStyle={styles.signUpButton}
                    containerStyle={styles.buttonContainer}
                    disabled={!isValid || !dirty}
                    disabledStyle={styles.disabledButton}
                    disabledTitleStyle={styles.buttonTitle}
                    title="Sign up"
                    titleStyle={styles.buttonTitle}
                    loading={isLoading}
                    loadingStyle={styles.loadingButton}
                    onPress={handleSubmit as any}
                  />
                </>
              )}
            </Formik>
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.paragraph}>I'm already a member, </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.signIn}>Sign In</Text>
          </TouchableOpacity>
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
  bottom: {
    alignItems: "baseline",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  buttonContainer: {
    alignSelf: "flex-start",
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
  },
  container: {
    alignItems: "stretch",
    backgroundColor: colors.black01,
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  disabledButton: {
    backgroundColor: colors.queenBlue50,
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
  loadingButton: {
    backgroundColor: colors.queenBlue,
  },
  rightIconContainer: {
    ...marginReset,
    ...paddingReset,
    paddingLeft: 8,
    paddingRight: 8,
  },
  title: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 32,
  },
  paragraph: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 16,
    marginBottom: 8,
  },
  section: {
    marginTop: 48,
  },
  signIn: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
  },
  signUpButton: {
    ...borderRadius4,
    ...paddingReset,
    backgroundColor: colors.queenBlue,
    height: 40,
    width: 100,
  },
  subtitle: {
    color: colors.black50,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 20,
  },
  top: {
    marginTop: 32,
  },
});

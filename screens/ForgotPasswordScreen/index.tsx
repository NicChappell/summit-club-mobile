import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, Input } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { Formik } from "formik";
import * as actions from "../../redux/actions";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import { forgotPasswordSchema } from "../../common/schemas";
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
import { IForgotPasswordScreen } from "./interfaces";

type Props = PropsFromRedux & IForgotPasswordScreen;

const ForgotPasswordScreen = ({ error, navigation, route }: Props) => {
  // state hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // effect hooks
  useEffect(() => {
    if (error) {
      // stop loading animation
      setIsLoading(false);
    }
  }, [error]);

  const handleSubmit = async ({ email }: { email: string }) => {
    // start loading animation
    setIsLoading(true);

    // submit email address
    console.log(`TODO: ${email}`);
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <ErrorOverlay error={error} />
        <Card
          containerStyle={styles.cardContainer}
          wrapperStyle={styles.cardWrapper}
        >
          <Text>Enter the email address associated with your account.</Text>
          <Text>We will send you a link to reset your password.</Text>
          <Formik
            validationSchema={forgotPasswordSchema}
            initialValues={{ email: "" }}
            onSubmit={handleSubmit}
          >
            {({
              dirty,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
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
                <Button
                  buttonStyle={styles.createAccountButton}
                  containerStyle={styles.createAccountButtonContainer}
                  disabled={!isValid || !dirty}
                  disabledStyle={styles.disabledButton}
                  disabledTitleStyle={styles.disabledButtonTitle}
                  title="Submit"
                  titleStyle={styles.createAccountButtonTitle}
                  loading={isLoading}
                  onPress={handleSubmit as any}
                />
              </>
            )}
          </Formik>
        </Card>
      </View>
    </DismissKeyboard>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = { signIn: actions.signIn };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ForgotPasswordScreen);

const styles = StyleSheet.create({
  body: {
    alignItems: "stretch",
  },
  forgotPasswordButton: {
    ...borderRadius4,
    ...paddingReset,
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  forgotPasswordButtonContainer: {
    alignSelf: "flex-end",
  },
  forgotPasswordButtonTitle: {
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
  footer: {
    alignItems: "baseline",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  header: {
    marginVertical: 32,
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
  signIn: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
  },
  subtitle: {
    color: colors.black50,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 20,
  },
});

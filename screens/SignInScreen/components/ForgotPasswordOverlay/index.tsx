import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Overlay } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { Formik } from "formik";
import { forgotPasswordSchema } from "../../../../common/schemas";
import {
  borderRadius4,
  colors,
  inputBorder,
  inputContainer,
  inputStyle,
  paddingReset,
  paragraph,
} from "../../../../common/styles";
import * as actions from "../../../../redux/actions";
import { RootState } from "../../../../redux/reducers";
import { IForgotPasswordOverlay } from "./types";

type Props = PropsFromRedux & IForgotPasswordOverlay;

const ForgotPasswordOverlay = ({ error, visible, setVisible }: Props) => {
  // state hooks
  const [disabled, setDisabled] = useState<boolean>(true);
  const [emailValue, setEmailValue] = useState<string>("");
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
    <Overlay
      animationType="fade"
      backdropStyle={styles.backdrop}
      isVisible={visible}
      onBackdropPress={() => setVisible(!visible)}
      overlayStyle={styles.overlay}
    >
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
          <View style={styles.container}>
            <View style={styles.overlayTitle}>
              <Text style={styles.header}>Forgot password</Text>
            </View>
            <View style={styles.overlayBody}>
              <Text style={paragraph}>
                Enter the email address associated with your account and we will
                send you a link to reset your password.
              </Text>
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
            </View>
            <View style={styles.overlayFooter}>
              <Button
                buttonStyle={styles.cancelButton}
                containerStyle={styles.buttonContainer}
                onPress={() => setVisible(!visible)}
                title="Cancel"
                titleStyle={styles.buttonTitle}
              />
              <Button
                buttonStyle={styles.submitButton}
                containerStyle={styles.buttonContainer}
                disabled={!isValid || !dirty}
                disabledStyle={styles.disabledButton}
                disabledTitleStyle={styles.buttonTitle}
                title="Submit"
                titleStyle={styles.buttonTitle}
                loading={isLoading}
                loadingStyle={styles.loadingButton}
                onPress={handleSubmit as any}
              />
            </View>
          </View>
        )}
      </Formik>
    </Overlay>
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

export default connector(ForgotPasswordOverlay);

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: colors.black25,
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    alignSelf: "flex-end",
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
  },
  cancelButton: {
    ...borderRadius4,
    ...paddingReset,
    alignItems: "center",
    backgroundColor: colors.queenBlue,
    height: 40,
    marginRight: 16,
    width: 100,
  },
  container: {
    alignItems: "stretch",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: colors.pistachio50,
  },
  header: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
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
    marginTop: 16,
  },
  inputStyle: {
    ...inputStyle,
  },
  loadingButton: {
    backgroundColor: colors.pistachio,
  },
  overlay: {
    ...borderRadius4,
    ...paddingReset,
    alignSelf: "stretch",
    margin: 16,
    overflow: "hidden",
  },
  overlayBody: {
    padding: 16,
  },
  overlayFooter: {
    alignItems: "center",
    borderTopColor: colors.black05,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  overlayTitle: {
    alignItems: "center",
    borderBottomColor: colors.black05,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 16,
  },
  paragraph: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 16,
    marginBottom: 8,
  },
  submitButton: {
    ...borderRadius4,
    ...paddingReset,
    alignItems: "center",
    backgroundColor: colors.pistachio,
    height: 40,
    width: 100,
  },
});

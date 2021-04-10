import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, CheckBox, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { colors } from "../../common/styles";
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
    <SafeAreaView style={styles.container}>
      <ErrorOverlay error={error} />
      <TermsAndConditions
        visible={isTermsAndConditionsVisible}
        setVisible={setIsTermsAndConditionsVisible}
      />
      <DismissKeyboard>
        <Card containerStyle={styles.cardWrapper}>
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
                  errorMessage={
                    errors.email && touched.email ? errors.email : undefined
                  }
                  errorStyle={{ color: colors.orangeRed }}
                  keyboardType="email-address"
                  label="Email"
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                  value={values.email}
                />
                <Input
                  autoCapitalize="none"
                  errorMessage={
                    errors.password && touched.password
                      ? errors.password
                      : undefined
                  }
                  errorStyle={{ color: colors.orangeRed }}
                  keyboardType="default"
                  label="Password"
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  rightIcon={
                    <Ionicons
                      name={secureTextEntry ? "ios-eye-off" : "ios-eye"}
                      size={24}
                      color={colors.black}
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                    />
                  }
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
                  disabled={!isValid || !dirty}
                  title="Create Account"
                  loading={isLoading}
                  onPress={handleSubmit as any}
                />
              </>
            )}
          </Formik>
        </Card>
      </DismissKeyboard>
    </SafeAreaView>
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
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
  cardWrapper: {
    alignSelf: "stretch",
  },
});

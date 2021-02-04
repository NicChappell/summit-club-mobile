import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, CheckBox, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import { Formik } from "formik";
import * as actions from "../../actions";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import { IAuthCredentials } from "../../common/interfaces";
import { signUpSchema } from "../../common/schemas";
import { colors, sizes } from "../../common/styles";
import { RootState } from "../../reducers";
import { ISignUpScreen } from "./interfaces";

type Props = PropsFromRedux & ISignUpScreen;

const SignUpScreen = ({ navigation, route, signUp }: Props) => {
  // state hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleSubmit = async (authCredentials: IAuthCredentials) => {
    // start loading animation
    setIsLoading(true);

    // submit auth credentials
    signUp(authCredentials);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ErrorOverlay />
      <DismissKeyboard>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Adventure Awaits</Card.Title>
          <Card.Divider />
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
                      size={sizes.icon}
                      color={colors.black}
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                    />
                  }
                  secureTextEntry={secureTextEntry}
                  value={values.password}
                />
                <CheckBox
                  title="I agree to the terms and conditions"
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
  return {};
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
  cardContainer: {
    alignSelf: "stretch",
  },
});

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import { Formik } from "formik";
import * as actions from "../../redux/actions";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import { IAuthCredentials } from "../../common/interfaces";
import { signInSchema } from "../../common/schemas";
import { colors, sizes } from "../../common/styles";
import { RootState } from "../../redux/reducers";
import { ISignInScreen } from "./interfaces";

type Props = PropsFromRedux & ISignInScreen;

const SignInScreen = ({ error, navigation, route, signIn }: Props) => {
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
    signIn(authCredentials);
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <ErrorOverlay error={error} />
        <Text>This is top text.</Text>
        <Card containerStyle={styles.cardWrapper}>
          <Formik
            validationSchema={signInSchema}
            initialValues={{ email: "", password: "" }}
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
                <Button
                  disabled={!isValid || !dirty}
                  title="Submit"
                  loading={isLoading}
                  onPress={handleSubmit as any}
                />
              </>
            )}
          </Formik>
        </Card>
        <View>
          <Button
            title="Go to Sign Up"
            onPress={() => navigation.navigate("SignUp")}
          />
          <Button
            title="Go to Forgot Password"
            onPress={() => navigation.navigate("ForgotPassword")}
          />
        </View>
        <Text>This is bottom text.</Text>
      </SafeAreaView>
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

export default connector(SignInScreen);

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

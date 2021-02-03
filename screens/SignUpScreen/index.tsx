import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, CheckBox, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase/app";
import "firebase/auth";
import { Formik } from "formik";
import { signUpSchema } from "../../common/schemas";
import { colors, sizes } from "../../common/styles";
import { ISignUpScreen } from "./interfaces";

const SignUpScreen = ({ navigation, route }: ISignUpScreen) => {
  // state hooks
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleSubmit = ({ email, password }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
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
                onPress={handleSubmit as any}
              />
            </>
          )}
        </Formik>
      </Card>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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

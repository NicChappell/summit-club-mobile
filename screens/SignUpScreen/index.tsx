import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
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
  const [email, setEmail] = useState<string>("");
  console.log(email);
  const [password, setPassword] = useState<string>("");
  console.log(password);

  // effect hooks
  useEffect(() => {
    firebase
      .auth()
      .createUserWithEmailAndPassword("test@test.test", "test1234")
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>Adventure Awaits</Card.Title>
        <Card.Divider />
        <Formik
          validationSchema={signUpSchema}
          initialValues={{ email: "", password: "", terms: true }}
          onSubmit={(values) => console.log(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            isValid,
            touched,
            values,
          }) => {
            console.log(values);
            return (
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
                    errors.password && touched.password ? errors.password : undefined
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
                />
                <Button
                  disabled={!isValid}
                  title="Create Account"
                  onPress={() => {}}
                />
              </>
            );
          }}
        </Formik>
      </Card>
      <Button title="Go back to Sign In" onPress={() => navigation.goBack()} />
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
  inputContainer: {},
});

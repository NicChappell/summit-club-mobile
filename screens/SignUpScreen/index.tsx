import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "firebase/app";
import "firebase/auth";
import { ISignUpScreen } from "./interfaces";

const SignUpScreen = ({ navigation, route }: ISignUpScreen) => {
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
        console.log(error);
      });
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is top text.</Text>
      <View>
        <Text>Join Summit Club (SignUpScreen)</Text>
        <Button
          title="Go back to Sign In"
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },
});

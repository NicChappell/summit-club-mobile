import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, CheckBox, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, sizes } from "../../common/styles";
import { ISignUpScreen } from "./interfaces";

const SignUpScreen = ({ navigation, route }: ISignUpScreen) => {
  // state hooks
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>Adventure Awaits</Card.Title>
        <Card.Divider />
        <Text>First Name</Text>
        <Input
          placeholder="first name"
          errorStyle={{ color: colors.orangeRed }}
          errorMessage="First name is required"
        />
        <Text>Last Name</Text>
        <Input
          placeholder="last name"
          errorStyle={{ color: colors.orangeRed }}
          errorMessage="Last name is required"
        />
        <Text>Email</Text>
        <Input
          placeholder="email"
          errorStyle={{ color: colors.orangeRed }}
          errorMessage="Email is required | Enter a valid email"
        />
        <Text>Password</Text>
        <Input
          placeholder="password"
          errorStyle={{ color: colors.orangeRed }}
          errorMessage="Password is required | Enter a valid password"
          rightIcon={
            <Ionicons
              name={secureTextEntry ? "ios-eye-off" : "ios-eye"}
              size={sizes.icon}
              color={colors.black}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
          secureTextEntry={secureTextEntry}
        />
        <CheckBox title="I agree to the terms and conditions" checked={true} />
        <Button title="Create Account" onPress={() => {}} />
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

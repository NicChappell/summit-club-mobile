import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { IDismissKeyboard } from "./types";

const DismissKeyboard = ({ children }: IDismissKeyboard) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;

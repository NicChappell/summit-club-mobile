import React from "react";
import { StyleSheet, Text } from "react-native";
import { Input } from "react-native-elements";
import { colors } from "../../styles";

const CustomInput = ({
  field: { name, onBlur, onChange, value },
  form: { errors, touched, setFieldTouched },
  ...inputProps
}) => {};

const styles = StyleSheet.create({});

export default CustomInput;

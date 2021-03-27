import { TextStyle, ViewStyle } from "react-native";
import { colors } from "./colors";
import { borderWidthReset, paddingReset, marginReset } from "./reset";
import {
  inputBorder,
  inputContainer,
  inputIconContainer,
  inputStyle,
} from "./input";

export const searchBarContainer = {
  ...borderWidthReset,
  alignItems: "center",
  alignSelf: "stretch",
  backgroundColor: colors.white,
  height: 64,
  justifyContent: "center",
  paddingHorizontal: 8,
} as ViewStyle;

export const searchBarInput = {
  ...inputStyle,
  ...marginReset,
  ...paddingReset,
  height: 40,
} as TextStyle;

export const searchBarInputContainer = {
  ...inputBorder,
  ...inputContainer,
  alignSelf: "stretch",
} as ViewStyle;

export const searchBarLeftIconContainer = {
  ...marginReset,
  ...paddingReset,
  ...inputIconContainer,
  alignItems: "center",
  justifyContent: "center",
} as ViewStyle;

export const searchBarRightIconContainer = {
  ...marginReset,
  ...paddingReset,
  ...inputIconContainer,
  alignItems: "center",
  justifyContent: "center",
} as ViewStyle;

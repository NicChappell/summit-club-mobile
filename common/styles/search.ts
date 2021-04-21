import { TextStyle, ViewStyle } from "react-native";
import { borderRadius4 } from "./border";
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
  ...marginReset,
  ...paddingReset,
  backgroundColor: colors.white,
  flex: 1,
  marginRight: 8,
} as ViewStyle;

export const searchBarInput = {
  ...inputStyle,
  ...marginReset,
  ...paddingReset,
  height: 40,
} as TextStyle;

export const searchBarInputContainer = {
  ...borderRadius4,
  ...inputBorder,
  ...inputContainer,
  alignItems: "stretch",
} as ViewStyle;

export const searchBarIconContainer = {
  ...marginReset,
  ...paddingReset,
  ...inputIconContainer,
  alignItems: "center",
  justifyContent: "center",
  width: 48,
} as ViewStyle;

export const searchBarWrapper = {
  alignItems: "center",
  flexDirection: "row",
  height: 64,
  justifyContent: "center",
  paddingHorizontal: 8,
  position: "relative",
} as ViewStyle;

export const searchButton = {
  ...borderRadius4,
  ...paddingReset,
  alignItems: "center",
  backgroundColor: colors.queenBlue,
  height: 40,
  justifyContent: "center",
  width: 72,
} as ViewStyle;

export const searchButtonTitle = {
  color: colors.white,
  fontFamily: "NunitoSans_600SemiBold",
  fontSize: 16,
} as TextStyle;

export const searchSuggestion = {
  color: colors.black50,
  fontFamily: "NunitoSans_400Regular",
  fontSize: 18,
} as TextStyle;

export const searchSuggestions = {
  alignItems: "stretch",
  backgroundColor: colors.white,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  borderBottomWidth: 1,
  borderBottomColor: colors.black25,
  borderLeftWidth: 1,
  borderLeftColor: colors.black25,
  borderRightWidth: 1,
  borderRightColor: colors.black25,
  justifyContent: "flex-start",
  paddingHorizontal: 56,
} as ViewStyle;

export const searchSuggestionsContainer = {
  width: "100%",
  position: "absolute",
  top: 52,
  paddingRight: 80,
} as ViewStyle;

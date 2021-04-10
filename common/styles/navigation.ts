import { TextStyle, ViewStyle } from "react-native";
import { colors } from "./colors";
import { paddingReset, marginReset } from "./reset";

export const navigationHeaderButton = {
  alignItems: "center",
  height: "100%",
  justifyContent: "center",
  width: "100%",
} as ViewStyle;

export const navigationHeaderCenterComponent = {
  alignItems: "center",
  // alignSelf: "stretch",
  height: 64,
  justifyContent: "center",
} as ViewStyle;

export const navigationHeaderContainer = {
  ...paddingReset,
  ...marginReset,
  backgroundColor: colors.white,
  flexDirection: "row",
  height: 64,
  justifyContent: "space-between",
  width: "100%",
} as ViewStyle;

export const navigationHeaderLeftComponent = {
  alignItems: "flex-start",
  height: 64,
  justifyContent: "center",
  width: 64,
} as ViewStyle;

export const navigationHeaderRightComponent = {
  alignItems: "flex-end",
  height: 64,
  justifyContent: "center",
  width: 64,
} as ViewStyle;

export const navigationHeaderTitle = {
  color: colors.queenBlue,
  fontFamily: "NotoSansJP_700Bold",
  fontSize: 16,
} as TextStyle;

export const navigationHeaderWrapper = {
  backgroundColor: colors.white,
  borderBottomColor: colors.queenBlue50,
  borderBottomWidth: 1,
} as ViewStyle;

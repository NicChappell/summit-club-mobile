import { TextStyle, ViewStyle } from "react-native";
import { colors } from "./colors";
import { paddingReset, marginReset } from "./reset";
import { sizes } from "./sizes";

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
  height: sizes.navigation.container.height,
  justifyContent: "space-between",
  width: "100%",
} as ViewStyle;

export const navigationHeaderLeftComponent = {
  alignItems: "flex-start",
  height: sizes.navigation.button.height,
  justifyContent: "center",
  width: sizes.navigation.button.width,
} as ViewStyle;

export const navigationHeaderRightComponent = {
  alignItems: "flex-end",
  height: sizes.navigation.button.height,
  justifyContent: "center",
  width: sizes.navigation.button.width,
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

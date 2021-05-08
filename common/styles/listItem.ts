import { TextStyle, ViewStyle } from "react-native";
import { colors } from "./colors";

export const listItem = {
  backgroundColor: "transparent",
} as ViewStyle;

export const listItemContainer = {
  alignSelf: "stretch",
} as ViewStyle;

export const listItemContent = {
  alignItems: "center",
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
} as ViewStyle;

export const listItemBorderBottom = {
  borderBottomColor: colors.black05,
  borderBottomWidth: 1,
} as ViewStyle;

export const listItemBorderTop = {
  borderTopColor: colors.black05,
  borderTopWidth: 1,
} as ViewStyle;

export const listItemTitle = {
  color: colors.black,
  fontFamily: "NotoSansJP_500Medium",
  fontSize: 18,
} as TextStyle;

export const listItemSubtitle = {
  color: colors.black,
  fontFamily: "NotoSansJP_500Medium",
  fontSize: 12,
} as TextStyle;

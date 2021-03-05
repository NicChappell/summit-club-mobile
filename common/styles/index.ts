import { StyleSheet } from "react-native";

export const cardContainer = {
  borderRadius: 4,
  borderWidth: 0,
  margin: 0,
  padding: 0,
};

export const colors = {
  redSalsa: "rgba(249, 65, 68, 1)", // #f94144
  redSalsa75: "rgba(249, 65, 68, 0.75)",
  redSalsa50: "rgba(249, 65, 68, 0.5)",
  redSalsa25: "rgba(249, 65, 68, 0.25)",
  orangeRed: "rgba(243, 114, 44, 1)", // #f3722c
  orangeRed75: "rgba(243, 114, 44, 0.75)",
  orangeRed50: "rgba(243, 114, 44, 0.5)",
  orangeRed25: "rgba(243, 114, 44, 0.25)",
  yellowOrange: "rgba(248, 150, 30, 1)", // #f8961e
  yellowOrange75: "rgba(248, 150, 30, 0.75)",
  yellowOrange50: "rgba(248, 150, 30, 0.5)",
  yellowOrange25: "rgba(248, 150, 30, 0.25)",
  maizeCrayola: "rgba(249, 199, 79, 1)", // #f9c74f
  maizeCrayola75: "rgba(249, 199, 79, 0.75)",
  maizeCrayola50: "rgba(249, 199, 79, 0.5)",
  maizeCrayola25: "rgba(249, 199, 79, 0.25)",
  pistachio: "rgba(144, 190, 109, 1)", // #90be6d
  pistachio75: "rgba(144, 190, 109, 0.75)",
  pistachio50: "rgba(144, 190, 109, 0.5)",
  pistachio25: "rgba(144, 190, 109, 0.25)",
  zomp: "rgba(67, 170, 139, 1)", //  #43aa8b
  zomp75: "rgba(67, 170, 139, 0.75)",
  zomp50: "rgba(67, 170, 139, 0.5)",
  zomp25: "rgba(67, 170, 139, 0.25)",
  queenBlue: "rgba(87, 117, 144, 1)", // #577590
  queenBlue75: "rgba(87, 117, 144, 0.75)",
  queenBlue50: "rgba(87, 117, 144, 0.5)",
  queenBlue25: "rgba(87, 117, 144, 0.25)",
  black: "rgba(0, 0, 0, 1)", // #000000
  black75: "rgba(0, 0, 0, 0.75)",
  black50: "rgba(0, 0, 0, 0.5)",
  black25: "rgba(0, 0, 0, 0.25)",
  black05: "rgba(0, 0, 0, 0.05)",
  white: "rgba(255, 255, 255, 1)", // #ffffff
  white75: "rgba(255, 255, 255, 0.75)",
  white50: "rgba(255, 255, 255, 0.5)",
  white25: "rgba(255, 255, 255, 0.25)",
};

// TODO: FIND A BETTER LOCATION FOR MAP STYLES
export const customMapStyle = [
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

export const inputContainer = {
  backgroundColor: colors.white,
  borderColor: colors.black25,
  borderRadius: 4,
  borderWidth: 1,
  height: 48,
  paddingHorizontal: 8,
};

export const shadow = {
  borderColor: "transparent",
  borderWidth: 0,
  shadowColor: colors.black,
  shadowOpacity: 0.5,
  shadowRadius: 1,
  shadowOffset: {
    height: 1,
    width: -1,
  },
};

export const sizes = {
  icon: 24,
};

export const stackHeader = StyleSheet.create({
  button: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  center: {
    color: colors.queenBlue,
    flex: 0,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 16,
    maxWidth: 240,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomColor: colors.queenBlue50,
    borderBottomWidth: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 64,
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
    paddingLeft: 12,
  },
  right: {
    flex: 1,
    paddingRight: 12,
  },
});

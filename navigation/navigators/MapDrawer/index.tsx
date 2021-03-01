import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Slider, Text } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { colors } from "../../../common/styles";
import MapStack from "../MapStack";

const TEMP_MAX_VALUE = 14439;

const features = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      id: 1,
      feet: 14439,
      meters: 0,
      latitude: 0,
      longitude: 0,
      name: "",
      class: "",
      county: "",
      state: "",
      country: "",
      continent: "",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      id: 1,
      feet: 14000,
      meters: 0,
      latitude: 0,
      longitude: 0,
      name: "",
      class: "",
      county: "",
      state: "",
      country: "",
      continent: "",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      id: 1,
      feet: 13000,
      meters: 0,
      latitude: 0,
      longitude: 0,
      name: "",
      class: "",
      county: "",
      state: "",
      country: "",
      continent: "",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      id: 1,
      feet: 12000,
      meters: 0,
      latitude: 0,
      longitude: 0,
      name: "",
      class: "",
      county: "",
      state: "",
      country: "",
      continent: "",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      id: 1,
      feet: 11000,
      meters: 0,
      latitude: 0,
      longitude: 0,
      name: "",
      class: "",
      county: "",
      state: "",
      country: "",
      continent: "",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      id: 1,
      feet: 10000,
      meters: 0,
      latitude: 0,
      longitude: 0,
      name: "",
      class: "",
      county: "",
      state: "",
      country: "",
      continent: "",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      id: 1,
      feet: 9000,
      meters: 0,
      latitude: 0,
      longitude: 0,
      name: "",
      class: "",
      county: "",
      state: "",
      country: "",
      continent: "",
    },
  },
];

const featureFilters = () => {};

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  // state hooks
  const [sliderValue, setSliderValue] = useState<number>(TEMP_MAX_VALUE);

  const handleApplyPress = () => {
    // TODO: APPLY FILTERs
    navigation.closeDrawer();
  };

  const handleCancelPress = () => {
    // TODO: APPLY FILTERs
    navigation.closeDrawer();
  };

  const handleCloseDrawerPress = () => navigation.closeDrawer();

  const handleElevationTierPress = () => {
    console.log("TODO");
  };

  const handleSliderChange = (value: number) => setSliderValue(value);

  return (
    <View style={[styles.container, { paddingTop: useSafeAreaInsets().top }]}>
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.closeDrawer}
          onPress={handleCloseDrawerPress}
        >
          <Ionicons name={"ios-close"} size={28} color={colors.queenBlue} />
        </TouchableOpacity>
        <Text style={styles.title}>
          Max Elevation:{" "}
          <Text style={styles.maxElevation}>
            {sliderValue.toLocaleString()}
          </Text>
        </Text>
        <Slider
          maximumTrackTintColor={colors.black25}
          maximumValue={TEMP_MAX_VALUE}
          minimumTrackTintColor={colors.black25}
          onValueChange={handleSliderChange}
          step={1}
          style={styles.slider}
          thumbStyle={{
            height: 24,
            width: 24,
            backgroundColor: colors.queenBlue,
          }}
          value={sliderValue}
        />
        <Text style={styles.title}>Elevation Tier</Text>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={handleElevationTierPress}
        >
          <Text style={styles.label}>Above 14,000</Text>
          <Ionicons
            color={colors.queenBlue}
            name={"ios-checkbox-outline"}
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={handleElevationTierPress}
        >
          <Text style={styles.label}>13,000 - 13,999</Text>
          <Ionicons
            color={colors.queenBlue}
            name={"ios-checkbox-outline"}
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={handleElevationTierPress}
        >
          <Text style={styles.label}>12,000 - 12,999</Text>
          <Ionicons
            color={colors.queenBlue}
            name={"ios-square-outline"}
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={handleElevationTierPress}
        >
          <Text style={styles.label}>11,000 - 11,999</Text>
          <Ionicons
            color={colors.queenBlue}
            name={"ios-square-outline"}
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={handleElevationTierPress}
        >
          <Text style={styles.label}>10,000 - 10,999</Text>
          <Ionicons
            color={colors.queenBlue}
            name={"ios-square-outline"}
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={handleElevationTierPress}
        >
          <Text style={styles.label}>Below 10,000</Text>
          <Ionicons
            color={colors.queenBlue}
            name={"ios-square-outline"}
            size={28}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <Button
          buttonStyle={styles.button}
          onPress={handleCancelPress}
          title="Cancel"
          titleStyle={styles.buttonTitle}
          type="clear"
        />
        <Button
          buttonStyle={styles.button}
          onPress={handleApplyPress}
          title="Apply"
          titleStyle={styles.buttonTitle}
          type="clear"
        />
      </View>
    </View>
  );
};

// new drawer navigator
const Drawer = createDrawerNavigator();

const MapDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ swipeEnabled: false }}
    >
      <Drawer.Screen name="MapStack" component={MapStack} />
    </Drawer.Navigator>
  );
};

export default MapDrawer;

const styles = StyleSheet.create({
  bottom: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    height: 64,
    justifyContent: "space-evenly",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  buttonTitle: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 16,
  },
  closeDrawer: {
    alignItems: "center",
    alignSelf: "flex-end",
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  container: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "space-between",
  },
  filterOption: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  label: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 16,
  },
  maxElevation: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_500Medium",
  },
  slider: {
    alignSelf: "stretch",
    marginHorizontal: 16,
    marginVertical: 4,
  },
  title: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  top: {},
});

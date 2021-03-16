import React, { useContext, useState } from "react";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { Button, Slider, Text } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { colors } from "../../../common/styles";
import { FeaturesContext } from "../../../contexts/";
import { ElevationTier, IMapFilters } from "../../../contexts/interfaces";
import { maxElevation } from "./constants";

const DrawerNavigatorContent = ({
  navigation,
}: DrawerContentComponentProps) => {
  // context hooks
  const { featureFilters, setFeatureFilters } = useContext(FeaturesContext);

  // state hooks
  const [filters, setFilters] = useState<IMapFilters>(
    featureFilters as IMapFilters
  );

  const handleApplyPress = () => {
    // apply filters
    setFeatureFilters(filters);

    // close drawer
    navigation.closeDrawer();
  };

  const handleCancelPress = () => {
    // reset filters
    setFilters(featureFilters as IMapFilters);

    // close drawer
    navigation.closeDrawer();
  };

  const handleCloseDrawerPress = () => {
    // reset filters
    setFilters(featureFilters as IMapFilters);

    // close drawer
    navigation.closeDrawer();
  };

  const handleElevationTierPress = (tier: ElevationTier) => {
    setFilters({
      ...filters,
      [tier]: !filters[tier],
    });
  };

  const handleSliderChange = (value: number) => {
    setFilters({
      ...filters,
      maxElevation: value,
    });
  };

  const handleSwitchChange = () => {
    setFilters({
      ...filters,
      countiesOverlay: !filters.countiesOverlay,
    });
  };

  return (
    <View style={[styles.container, { paddingTop: useSafeAreaInsets().top }]}>
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.closeDrawer}
          onPress={handleCloseDrawerPress}
        >
          <Ionicons name={"ios-close"} size={28} color={colors.queenBlue} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Max Elevation</Text>
          <Text style={styles.maxElevation}>
            {filters.maxElevation.toLocaleString()}'
          </Text>
        </View>
        <Slider
          maximumTrackTintColor={colors.black25}
          maximumValue={maxElevation}
          minimumTrackTintColor={colors.black25}
          minimumValue={10000}
          onValueChange={handleSliderChange}
          step={1}
          style={styles.slider}
          thumbStyle={{
            height: 24,
            width: 24,
            backgroundColor: colors.queenBlue,
          }}
          value={filters.maxElevation}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Elevation Tier</Text>
        </View>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={() => handleElevationTierPress("above14")}
        >
          <Text style={styles.label}>Above 14,000'</Text>
          <Ionicons
            color={colors.queenBlue}
            name={
              filters.above14 ? "ios-checkbox-outline" : "ios-square-outline"
            }
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={() => handleElevationTierPress("between13and14")}
        >
          <Text style={styles.label}>13,000' - 14,000'</Text>
          <Ionicons
            color={colors.queenBlue}
            name={
              filters.between13and14
                ? "ios-checkbox-outline"
                : "ios-square-outline"
            }
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={() => handleElevationTierPress("between12and13")}
        >
          <Text style={styles.label}>12,000' - 13,000'</Text>
          <Ionicons
            color={colors.queenBlue}
            name={
              filters.between12and13
                ? "ios-checkbox-outline"
                : "ios-square-outline"
            }
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={() => handleElevationTierPress("between11and12")}
        >
          <Text style={styles.label}>11,000' - 12,000'</Text>
          <Ionicons
            color={colors.queenBlue}
            name={
              filters.between11and12
                ? "ios-checkbox-outline"
                : "ios-square-outline"
            }
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={() => handleElevationTierPress("between10and11")}
        >
          <Text style={styles.label}>10,000' - 11,000'</Text>
          <Ionicons
            color={colors.queenBlue}
            name={
              filters.between10and11
                ? "ios-checkbox-outline"
                : "ios-square-outline"
            }
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={() => handleElevationTierPress("below10")}
        >
          <Text style={styles.label}>Below 10,000'</Text>
          <Ionicons
            color={colors.queenBlue}
            name={
              filters.below10 ? "ios-checkbox-outline" : "ios-square-outline"
            }
            size={28}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Counties Overlay</Text>
          <Switch
            trackColor={{ false: colors.black05, true: colors.pistachio75 }}
            thumbColor={colors.white}
            ios_backgroundColor={colors.black05}
            onValueChange={handleSwitchChange}
            style={styles.switch}
            value={filters.countiesOverlay}
          />
        </View>
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

export default DrawerNavigatorContent;

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
    paddingVertical: 8,
  },
  label: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 16,
  },
  maxElevation: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 20,
  },
  slider: {
    alignSelf: "stretch",
    marginHorizontal: 16,
  },
  switch: {
    borderColor: colors.queenBlue,
    borderWidth: 2,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    marginRight: -4,
  },
  title: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 20,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  top: {},
});

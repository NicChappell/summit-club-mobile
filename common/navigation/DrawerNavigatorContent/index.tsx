import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Slider, Text } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect, ConnectedProps } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { CustomSwitch } from "../../../common/components";
import { colors } from "../../../common/styles";
import { ElevationTier, IFeatureFilters } from "../../../common/types";
import * as actions from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";

type Props = PropsFromRedux & DrawerContentComponentProps;

const DrawerNavigatorContent = ({
  featureFilters,
  navigation,
  setFeatureFilters,
}: Props) => {
  // state hooks
  const [filters, setFilters] = useState<IFeatureFilters | undefined>();

  // effect hooks
  useEffect(() => {
    setFilters(featureFilters);
  }, []);

  // return early if filters is undefined
  if (!filters) return null;

  // destructure state
  const {
    maxElevation,
    above14,
    between13and14,
    between12and13,
    between11and12,
    between10and11,
    below10,
    countiesOverlay,
  } = filters;

  const handleApplyPress = () => {
    // apply filters
    setFeatureFilters(filters);

    // close drawer
    navigation.closeDrawer();
  };

  const handleCancelPress = () => {
    // reset filters
    setFilters(featureFilters);

    // close drawer
    navigation.closeDrawer();
  };

  const handleCloseDrawerPress = () => {
    // reset filters
    setFilters(featureFilters);

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
      countiesOverlay: !filters?.countiesOverlay,
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
            {maxElevation?.toLocaleString()}'
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
          value={maxElevation}
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
            name={above14 ? "ios-checkbox-outline" : "ios-square-outline"}
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
              between13and14 ? "ios-checkbox-outline" : "ios-square-outline"
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
              between12and13 ? "ios-checkbox-outline" : "ios-square-outline"
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
              between11and12 ? "ios-checkbox-outline" : "ios-square-outline"
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
              between10and11 ? "ios-checkbox-outline" : "ios-square-outline"
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
            name={below10 ? "ios-checkbox-outline" : "ios-square-outline"}
            size={28}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Counties Overlay</Text>
          <CustomSwitch
            handleSwitchChange={handleSwitchChange}
            value={Boolean(countiesOverlay)}
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

const mapStateToProps = (state: RootState) => {
  return { featureFilters: state.features.featureFilters };
};

const mapDispatchToProps = { setFeatureFilters: actions.setFeatureFilters };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DrawerNavigatorContent);

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
    height: 64,
    justifyContent: "center",
    width: 64,
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
    paddingVertical: 4,
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

import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import MapView, {
  Callout,
  Camera,
  LatLng,
  MapEvent,
  Marker,
  Polygon,
  Region,
} from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import { ErrorOverlay } from "../../common/components";
import { customMapStyle, initialRegion } from "../../common/constants";
import {
  borderRadius4,
  colors,
  paddingReset,
  shadow,
  shadowReset,
} from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { ICheckInScreen } from "./interfaces";

type Props = PropsFromRedux & ICheckInScreen;

const CheckInScreen = ({ error, navigation, route, setError }: Props) => {
  // state hooks
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ref hooks
  const mapRef = useRef<MapView>(null);

  const handleRegionChange = (region: Region) => {};

  const handleRegionChangeComplete = async (region: Region) => {};

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <MapView
        customMapStyle={customMapStyle}
        initialRegion={initialRegion}
        loadingEnabled={true}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        pitchEnabled={false}
        provider={"google"}
        ref={mapRef}
        style={styles.map}
      />
      <View style={styles.checkInContainer}>
        <Button
          buttonStyle={styles.checkInButton}
          containerStyle={styles.buttonContainer}
          disabled={disabled}
          disabledStyle={styles.disabledButton}
          disabledTitleStyle={styles.disabledButtonTitle}
          loading={isLoading}
          loadingStyle={styles.loadingButton}
          onPress={() => console.log("TODO")}
          title="Check in"
          titleStyle={styles.buttonTitle}
          type="outline"
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {
  setError: actions.setError,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CheckInScreen);

const styles = StyleSheet.create({
  buttonContainer: {
    ...borderRadius4,
    backgroundColor: colors.white,
  },
  buttonTitle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
  },
  checkInButton: {
    ...borderRadius4,
    ...paddingReset,
    backgroundColor: colors.white,
    borderColor: colors.queenBlue,
    borderWidth: 1,
    height: 44,
    width: 112,
  },
  checkInContainer: {
    ...borderRadius4,
    ...shadow,
    bottom: 32,
    position: "absolute",
    zIndex: 1,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.black01,
    flex: 1,
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: colors.white,
    borderColor: colors.queenBlue50,
  },
  disabledButtonTitle: {
    color: colors.queenBlue50,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
  },
  loadingButton: {
    backgroundColor: colors.white,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});

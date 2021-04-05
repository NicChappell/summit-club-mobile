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
      <View style={styles.checkIn}>
        <Button
          buttonStyle={styles.checkInButton}
          containerStyle={styles.checkInButtonContainer}
          disabled={disabled}
          disabledStyle={styles.disabledButtonStyle}
          disabledTitleStyle={styles.disabledButtonTitleStyle}
          onPress={() => console.log("TODO")}
          title="Check in"
          titleStyle={styles.checkInButtonTitle}
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
  checkIn: {
    ...borderRadius4,
    ...shadow,
    bottom: 32,
    position: "absolute",
    zIndex: 1,
  },
  checkInButton: {
    ...borderRadius4,
    ...shadowReset,
    backgroundColor: colors.white,
    borderColor: colors.queenBlue,
    borderWidth: 1,
  },
  checkInButtonContainer: {
    ...borderRadius4,
    backgroundColor: colors.white,
  },
  checkInButtonTitle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.black01,
    flex: 1,
    justifyContent: "center",
  },
  disabledButtonStyle: {
    borderColor: colors.black25,
  },
  disabledButtonTitleStyle: {
    color: colors.black25,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});

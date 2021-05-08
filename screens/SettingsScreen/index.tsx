import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Divider, ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import {
  CustomSwitch,
  DismissKeyboard,
  ErrorOverlay,
} from "../../common/components";
import {
  colors,
  divider,
  listItem,
  listItemContainer,
  listItemContent,
  listItemTitle,
  listItemSubtitle,
  paragraph,
} from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { ISettingsScreen } from "./types";

type Props = PropsFromRedux & ISettingsScreen;

const SettingsScreen = ({ error, navigation, resetTour, route }: Props) => {
  // state hooks
  const [checkInPreference, setCheckInPreference] = useState<boolean>(true);
  const [locationPermission, setLocationPermission] = useState<boolean>(true);

  return (
    <DismissKeyboard>
      <ScrollView style={styles.scrollView}>
        <ErrorOverlay error={error} />
        <View style={styles.container}>
          <Text style={styles.header}>Permissions</Text>
          <View style={listItemContainer}>
            <ListItem containerStyle={listItem}>
              <Ionicons
                name={"ios-location-outline"}
                size={24}
                color={colors.queenBlue}
              />
              <View style={listItemContent}>
                <View>
                  <Text style={paragraph}>Your location</Text>
                </View>
                <CustomSwitch
                  handleSwitchChange={() =>
                    setLocationPermission(!locationPermission)
                  }
                  value={locationPermission}
                />
              </View>
            </ListItem>
          </View>
          <Divider style={divider} />
          <Text style={styles.header}>Preferences</Text>
          <View style={listItemContainer}>
            <ListItem containerStyle={listItem}>
              <Ionicons
                name={"ios-shield-checkmark-outline"}
                size={24}
                color={colors.queenBlue}
              />
              <View style={listItemContent}>
                <View>
                  <Text style={paragraph}>Share my check-ins</Text>
                </View>
                <CustomSwitch
                  handleSwitchChange={() =>
                    setCheckInPreference(!checkInPreference)
                  }
                  value={checkInPreference}
                />
              </View>
            </ListItem>
          </View>
          <Button
            buttonStyle={styles.disabledButton}
            containerStyle={styles.buttonContainer}
            onPress={resetTour}
            title="Reset tour"
            titleStyle={styles.disabledButtonTitle}
          />
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {
  resetTour: actions.resetTour,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SettingsScreen);

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "flex-start",
    marginHorizontal: 8,
  },
  container: {
    padding: 16,
  },
  disabledButton: {
    backgroundColor: colors.queenBlue,
  },
  disabledButtonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  header: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
    marginBottom: 16,
    marginHorizontal: 8,
  },
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

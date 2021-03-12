import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { colors } from "../../../common/styles";
import ExploreStack from "../ExploreStack";

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const handleApplyPress = () => {
    // TODO: APPLY FILTERs
    navigation.closeDrawer();
  };

  const handleCancelPress = () => {
    // TODO: APPLY FILTERs
    navigation.closeDrawer();
  };

  const handleCloseDrawerPress = () => navigation.closeDrawer();

  return (
    <View style={[styles.container, { paddingTop: useSafeAreaInsets().top }]}>
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.closeDrawer}
          onPress={handleCloseDrawerPress}
        >
          <Ionicons name={"ios-close"} size={28} color={colors.queenBlue} />
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

const ExploreDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ swipeEnabled: false }}
    >
      <Drawer.Screen name="ExploreStack" component={ExploreStack} />
    </Drawer.Navigator>
  );
};

export default ExploreDrawer;

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
  top: {},
});

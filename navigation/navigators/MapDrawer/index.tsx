import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckBox, Slider } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { colors } from "../../../common/styles";
import MapStack from "../MapStack";

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const handlePress = () => navigation.closeDrawer();

  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeDrawer} onPress={handlePress}>
          <Ionicons name={"ios-close"} size={28} color={colors.queenBlue} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: "stretch",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Slider
            value={0.4}
            onValueChange={(value) => console.log(value)}
            thumbStyle={{
              height: 24,
              width: 24,
              backgroundColor: colors.queenBlue,
            }}
          />
          <Text>Value: {0.4}</Text>
        </View>
        <View>
          <Text>14ers</Text>
          <CheckBox
            checkedIcon={
              <Ionicons
                name={"ios-checkbox-outline"}
                size={28}
                color={colors.queenBlue}
              />
            }
            uncheckedIcon={
              <Ionicons
                name={"ios-square-outline"}
                size={28}
                color={colors.queenBlue}
              />
            }
            checked={true}
            onPress={() => console.log("TODO: HANDLE THIS CLICK")}
          />
        </View>
        <View>
          <Text>13ers</Text>
          <CheckBox
            checkedIcon={
              <Ionicons
                name={"ios-checkbox-outline"}
                size={28}
                color={colors.queenBlue}
              />
            }
            uncheckedIcon={
              <Ionicons
                name={"ios-square-outline"}
                size={28}
                color={colors.queenBlue}
              />
            }
            checked={true}
            onPress={() => console.log("TODO: HANDLE THIS CLICK")}
          />
        </View>
      </View>
    </DrawerContentScrollView>
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
  closeDrawer: {
    alignItems: "center",
    alignSelf: "flex-end",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

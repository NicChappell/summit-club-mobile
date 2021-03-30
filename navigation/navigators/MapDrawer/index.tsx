import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerNavigatorContent } from "../../../common/navigation";
import MapStack from "../MapStack";

// new drawer navigator
const Drawer = createDrawerNavigator();

const MapDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerNavigatorContent {...props} />}
      screenOptions={{ swipeEnabled: false }}
    >
      <Drawer.Screen name="MapStack" component={MapStack} />
    </Drawer.Navigator>
  );
};

export default MapDrawer;

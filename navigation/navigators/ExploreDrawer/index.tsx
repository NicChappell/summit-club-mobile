import React from "react";
import "firebase/firestore";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerNavigatorContent } from "../../../common/navigation";
import ExploreTabs from "../ExploreTabs";

// new drawer navigator
const Drawer = createDrawerNavigator();

const ExploreDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerNavigatorContent {...props} />}
      screenOptions={{ swipeEnabled: false }}
    >
      <Drawer.Screen name="ExploreStack" component={ExploreTabs} />
    </Drawer.Navigator>
  );
};

export default ExploreDrawer;

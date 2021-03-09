import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";
import { TourScreen } from "../../../screens";
import HomeStack from "../HomeStack";
import { HomeTabsParamList } from "./types";

type Props = PropsFromRedux & HomeTabsParamList;

// new bottom tab navigator
const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = ({ account, checkTour }: Props) => {
  // destructure account
  const { tourStatus } = account;

  React.useEffect(() => {
    checkTour();
  }, []);

  return (
    <Tab.Navigator screenOptions={{ tabBarVisible: false }}>
      {tourStatus ? (
        <Tab.Screen name="Home" component={HomeStack} />
      ) : (
        <Tab.Screen name="Tour" component={TourScreen} />
      )}
    </Tab.Navigator>
  );
};

const mapStateToProps = ({ account }: RootState) => {
  return { account };
};

const mapDispatchToProps = {
  checkTour: actions.checkTour,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomeTabs);

import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "../../../actions";
import { RootState } from "../../../reducers";
import { HomeScreen, TourScreen } from "../../../screens";
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
        <Tab.Screen name="Home" component={HomeScreen} />
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

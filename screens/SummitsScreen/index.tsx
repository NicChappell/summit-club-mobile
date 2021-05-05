import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { ErrorOverlay, SummitDetailsListItem } from "../../common/components";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { IUserSummit } from "../../services";
import { ISummitsScreen } from "./types";

type Props = PropsFromRedux & ISummitsScreen;

const SummitsScreen = ({ error, navigation, route, setFeature }: Props) => {
  // destructure route params
  const { summits } = route.params;

  const handleSummitPress = (item: IUserSummit) => {
    // destructure item
    const { feature } = item;

    // update global state
    setFeature(feature);

    // navigate to Feature screen
    navigation.navigate("Feature", { screen: "Feature" });
  };

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <FlatList
        data={summits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => handleSummitPress(item)}>
              <SummitDetailsListItem item={item} />
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {
  setFeature: actions.setFeature,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SummitsScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  listItemImage: {
    height: "100%",
    width: "100%",
  },
  listItemImageContainer: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
});

import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { ErrorOverlay } from "../../common/components";
import { colors } from "../../common/styles";
import { RootState } from "../../redux/reducers";
import { SummitDetailsListItem } from "./components";
import { ISummitsScreen } from "./interfaces";

type Props = PropsFromRedux & ISummitsScreen;

const SummitsScreen = ({ error, navigation, route }: Props) => {
  // destructure route params
  const { summits } = route.params;
  console.log(summits);

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <FlatList
        data={summits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log("TODO: HANDLE PRESS")}>
            <SummitDetailsListItem item={item} />
          </TouchableOpacity>
        )}
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

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SummitsScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  listItemContainerStyle: {
    // width: "100%",
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

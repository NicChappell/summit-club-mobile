import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { BasicDetailsCard, ErrorOverlay } from "../../common/components";
import { IError } from "../../common/interfaces";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { Collection, ICollection } from "../../services";
import { IExploreScreen } from "./interfaces";

type Props = PropsFromRedux & IExploreScreen;

const ExploreScreen = ({ error, navigation, route, setError }: Props) => {
  // state hooks
  const [collections, setCollections] = useState<ICollection[] | undefined>();

  // effect hooks
  useEffect(() => {
    Collection.get()
      .then((collections) => {
        setCollections(collections);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });
  }, []);

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Collections</Text>
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={collections}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BasicDetailsCard item={item} navigation={navigation} />
          )}
        />
      </View>
      <View style={styles.section}>
        {/* <FlatList
          data={filteredFeatures}
          renderItem={({ item: feature }) => (
            <HorizontalDetailsCard feature={feature} navigation={navigation} />
          )}
          keyExtractor={(feature) => feature.properties?.id.toString()}
          style={{ alignSelf: "stretch" }}
        /> */}
      </View>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = { setError: actions.setError };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ExploreScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "flex-start",
  },
  section: {
    marginBottom: 24,
    padding: 8,
  },
  sectionTitle: {
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 20,
    marginBottom: 0,
  },
  separator: {
    width: 16,
  },
});

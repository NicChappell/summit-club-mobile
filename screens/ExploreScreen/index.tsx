import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  BasicDetailsCard,
  ErrorOverlay,
  HorizontalDetailsCard,
} from "../../common/components";
import { IError } from "../../common/interfaces";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { Collection, ICollection, Summit } from "../../services";
import { IExploreScreen } from "./interfaces";

type Props = PropsFromRedux & IExploreScreen;

const ExploreScreen = ({ error, navigation, route, setError }: Props) => {
  // state hooks
  const [collections, setCollections] = useState<ICollection[] | undefined>();
  const [filteredSummits, setFilteredSummits] = useState<
    Feature<Geometry, GeoJsonProperties>[] | undefined
  >();

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

    Summit.query()
      .then((filteredSummits) => {
        setFilteredSummits(filteredSummits);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });
  }, []);

  const basicDetailsCardDimensions = { height: 48, width: 128 };

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <View
        style={[
          styles.section,
          {
            borderBottomColor: colors.queenBlue25,
            borderBottomWidth: 1,
            paddingBottom: 16,
            paddingTop: 8,
          },
        ]}
      >
        <Text style={styles.sectionTitle}>Summit Collections</Text>
        <FlatList
          ItemSeparatorComponent={() => (
            <View style={styles.horizontalSeparator} />
          )}
          data={collections}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BasicDetailsCard
              dimensions={{
                height: basicDetailsCardDimensions.height,
                width: basicDetailsCardDimensions.width,
              }}
              item={item}
              navigation={navigation}
            />
          )}
          style={{ height: basicDetailsCardDimensions.height }}
        />
      </View>
      <View style={[styles.section, { paddingTop: 16 }]}>
        <TouchableOpacity
          style={styles.sortBy}
          onPress={() => console.log("TODO")}
        >
          <Text style={styles.sectionTitle}>Sort by elevation</Text>
          <Ionicons name={"ios-caret-up"} size={20} color={colors.queenBlue} />
        </TouchableOpacity>
        <FlatList
          ItemSeparatorComponent={() => (
            <View style={styles.verticalSeparator} />
          )}
          data={filteredSummits}
          keyExtractor={(feature) => feature.properties?.id.toString()}
          renderItem={({ item: feature }) => (
            <HorizontalDetailsCard feature={feature} navigation={navigation} />
          )}
          style={{ height: 256 + 16 }}
        />
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
    alignItems: "flex-start",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "flex-start",
    padding: 8,
  },
  horizontalSeparator: {
    width: 16,
  },
  section: {
    alignSelf: "stretch",
  },
  sectionTitle: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 20,
    marginBottom: 8,
  },
  sortBy: {
    alignItems: "baseline",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  verticalSeparator: {
    height: 16,
  },
});

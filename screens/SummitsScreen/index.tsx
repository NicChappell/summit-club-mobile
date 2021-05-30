import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import {
  Feature as GeoJsonFeature,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import { ErrorOverlay, SummitDetailsListItem } from "../../common/components";
import { colors } from "../../common/styles";
import { IError } from "../../common/types";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import {
  CheckOff,
  Feature,
  ICheckOffRecord,
  IUserSummit,
  processFeatureCollection,
} from "../../services";
import { ISummitsScreen } from "./types";

type Props = PropsFromRedux & ISummitsScreen;

const SummitsScreen = ({
  error,
  navigation,
  route,
  setError,
  setFeature,
}: Props) => {
  // destructure route params
  const { summits } = route.params;

  // state hooks
  const [checkedOffFeatures, setCheckedOffFeatures] = useState<
    GeoJsonFeature<Geometry, GeoJsonProperties>[]
  >([]);

  // effect hooks
  useEffect(() => {
    fetchCheckOffs();
  }, []);

  const handleSummitPress = (item: IUserSummit) => {
    // destructure item
    const { feature } = item;

    // update global state
    setFeature(feature);

    // navigate to Feature screen
    navigation.navigate("Feature", { screen: "Feature" });
  };

  const fetchCheckOffs = async () => {
    // fetch check-off records from database
    const checkOffResultSet = await CheckOff.selectWhere({ user_id: "12345" });

    // destructure result set
    const { _array: checkOffRecords }: any = checkOffResultSet.rows;

    // get feature id from each check-off record
    const featureIds: string[] = checkOffRecords.map(
      (checkOffRecord: ICheckOffRecord) => checkOffRecord.feature_id
    );

    // fetch feature records from database
    const featureResultSet = await Feature.selectWhereIn("id", featureIds);

    // convert result set into feature collection
    const { features } = processFeatureCollection(featureResultSet);

    // update local state
    setCheckedOffFeatures(features);
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
  setError: actions.setError,
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

import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import * as turf from "@turf/turf";
import { ErrorOverlay, SummitDetailsListItem } from "../../common/components";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { CheckOff, ICheckOffResult, IUserSummit } from "../../services";
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
  const [checkOffRecords, setCheckOffRecords] = useState<ICheckOffResult[]>([]);
  const [userSummits, setUserSummits] = useState<IUserSummit[]>([]);

  // effect hooks
  useEffect(() => {
    // fetch check-off records from database
    CheckOff.selectWhere({ user_id: "12345" })
      .then((resultSet) => {
        // destructure result set
        const { _array: checkOffRecords }: any = resultSet.rows;

        // update local state
        setCheckOffRecords(checkOffRecords);
      })
      .catch((error) => {
        // dispatch error
        setError({
          message: error.message,
        });
      });
  }, []);

  useEffect(() => {
    // process summit records
    const userSummits: IUserSummit[] = checkOffRecords.map((checkOffRecord) => {
      // create a GeoJSON Geometry
      const geometry: Geometry = {
        type: "Point",
        coordinates: [checkOffRecord.longitude, checkOffRecord.latitude],
      };

      // create a GeoJSON properties object
      const properties: GeoJsonProperties = {
        class: checkOffRecord.class,
        continent: checkOffRecord.continent,
        country: checkOffRecord.country,
        county: checkOffRecord.county,
        feet: checkOffRecord.feet,
        id: checkOffRecord.id,
        latitude: checkOffRecord.latitude,
        longitude: checkOffRecord.longitude,
        meters: checkOffRecord.meters,
        name: checkOffRecord.name,
        state: checkOffRecord.state,
      };

      // create a GeoJSON Feature
      const feature: Feature = turf.feature(geometry, properties);

      return {
        checkedIn: false,
        checkedOff: true,
        feature,
      };
    });

    // update local state
    setUserSummits(userSummits);
  }, [checkOffRecords]);

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
        data={userSummits}
        keyExtractor={(item) => item.feature.properties?.id.toString()}
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

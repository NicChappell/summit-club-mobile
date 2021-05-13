import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { ListItem } from "react-native-elements";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import * as actions from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";
import { processFeature, Summit } from "../../../services";
import { getFeaturePhoto } from "../../helpers";
import {
  colors,
  featureCoordinate,
  featureLocation,
  featureName,
} from "../../styles";
import StaticMapBackground from "../StaticMapBackground";
import { ISearchResultsListItem } from "./types";

type Props = PropsFromRedux & ISearchResultsListItem;

const SearchResultsListItem = ({ navigation, name, setFeature }: Props) => {
  // state hooks
  const [localFeature, setLocalFeature] = useState<
    Feature<Geometry, GeoJsonProperties>
  >();
  const [featurePhoto, setFeaturePhoto] = useState<any>();

  // effect hooks
  useEffect(() => {
    Summit.findByName(name)
      .then((resultSet) => {
        // format result
        const feature = processFeature(resultSet);

        // update local state
        setLocalFeature(feature);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  useEffect(() => {
    // retreive feature photo if available
    const featurePhoto = getFeaturePhoto(localFeature?.properties?.name);

    // update state
    setFeaturePhoto(featurePhoto);
  }, [localFeature]);

  const handlePress = () => {
    // update global state
    setFeature(localFeature);

    // navigate to Feature screen
    navigation.navigate("Feature", { screen: "Feature" });
  };

  if (localFeature) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <ListItem bottomDivider>
          {featurePhoto ? (
            // render feature photo if available
            <View
              style={[
                styles.listItemImageContainer,
                {
                  borderRadius: 4,
                  height: 80,
                  width: 80,
                },
              ]}
            >
              <Image source={featurePhoto} style={styles.listItemImage} />
            </View>
          ) : (
            // render static map by default
            <StaticMapBackground
              containerStyles={{
                borderRadius: 4,
                height: 80,
                width: 80,
              }}
              feature={localFeature}
            />
          )}
          <ListItem.Content>
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={featureName}>
                  {localFeature?.properties?.name}
                </Text>
                <Text style={featureLocation}>
                  {localFeature?.properties?.feet.toLocaleString()} ft ·{" "}
                  {localFeature?.properties?.county} County
                </Text>
                <Text style={featureCoordinate}>
                  {localFeature?.properties?.latitude.toFixed(3)}°{" "}
                  {localFeature?.properties?.latitude > 0 ? "N" : "S"},{" "}
                  {localFeature?.properties?.longitude.toFixed(3)}°{" "}
                  {localFeature?.properties?.longitude > 0 ? "E" : "W"}
                </Text>
              </View>
            </View>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  }

  return null;
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  setFeature: actions.setFeature,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SearchResultsListItem);

const styles = StyleSheet.create({
  listItemImage: {
    height: "100%",
    width: "100%",
  },
  listItemImageContainer: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  leftColumn: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  rightColumn: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  verified: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
  },
});

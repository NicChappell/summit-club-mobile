import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View /* Text */ } from "react-native";
// import { Button } from "react-native-elements";
import { Feature } from "geojson";
import { HorizontalDetailsCard } from "../../common/components";
import { colors } from "../../common/styles";
import { IExploreScreen } from "./interfaces";

// const MOCK_FEATURE: Feature = {
//   type: "Feature",
//   geometry: {
//     type: "Point",
//     coordinates: [-105.6162397, 40.2548614],
//   },
//   properties: {
//     id: 123456789,
//     feet: 14262,
//     meters: 4347,
//     latitude: 40.2548614,
//     longitude: -105.6162397,
//     name: "Longs Peak",
//     class: "Summit",
//     county: "Boulder",
//     state: "CO",
//     country: "United States",
//     continent: "North America",
//   },
// };

import { MOCK_FEATURES } from "../../data/mocks/features";

const ExploreScreen = ({ navigation, route }: IExploreScreen) => {
  // state hooks
  const [filteredFeatures, setFilteredFeatures] = useState<
    Feature[] | undefined
  >(undefined);

  // effect hooks
  useEffect(() => {
    setFilteredFeatures(MOCK_FEATURES);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredFeatures}
        renderItem={({ item: feature }) => (
          <HorizontalDetailsCard feature={feature} navigation={navigation} />
        )}
        keyExtractor={(feature) => feature.properties?.id.toString()}
        style={{ alignSelf: "stretch" }}
      />
      {/* <View>
        <Text>ExploreScreen</Text>
        <Button
          title="Go to Features"
          onPress={() =>
            navigation.navigate("Feature", {
              id: 1,
              name: 'mrah',
            })
          }
        />
      </View> */}
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "flex-start",
  },
});

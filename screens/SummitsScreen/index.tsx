import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ListItem } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { ErrorOverlay } from "../../common/components";
import { IError } from "../../common/interfaces";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { CheckIn, ICheckIn } from "../../services";
import { ISummitsScreen } from "./interfaces";

import { MOCK_FEATURE } from "../../data/mocks/features";

type Props = PropsFromRedux & ISummitsScreen;

const SummitsScreen = ({ error, navigation, route, setError }: Props) => {
  // state hooks
  const [checkIns, setCheckIns] = useState<ICheckIn[] | undefined>();

  // effect hooks
  useEffect(() => {
    CheckIn.get()
      .then((checkIns) => {
        setCheckIns(checkIns);
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

      <FlatList
        data={checkIns}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // TODO: SQLITE DATABASE QUERY
          const feature = MOCK_FEATURE;

          return (
            <TouchableOpacity onPress={() => console.log("TODO: HANDLE PRESS")}>
              <ListItem
                bottomDivider
                containerStyle={styles.listItemContainerStyle}
                key={item.id}
              >
                <ListItem.Content>
                  <ListItem.Title>{feature.properties?.name}</ListItem.Title>
                  <ListItem.Subtitle>{`${feature.properties?.feet.toLocaleString()} ft / ${feature.properties?.meters.toLocaleString()} m`}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
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

const mapDispatchToProps = { setError: actions.setError };

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
});

import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import {
  BasicDetailsCard,
  DismissKeyboard,
  ErrorOverlay,
  FullDetailsCard,
} from "../../common/components";
import { IError } from "../../common/interfaces";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { Collection, ICollection } from "../../services";
import { RecentCheckIns } from "./components";
import { IHomeScreen } from "./interfaces";

type Props = PropsFromRedux & IHomeScreen;

const HomeScreen = ({ error, navigation, route, setError }: Props) => {
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
    <DismissKeyboard>
      <ScrollView style={styles.scrollView}>
        <ErrorOverlay error={error} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured summits</Text>
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
          <Text style={styles.sectionTitle}>Recent check-ins</Text>
          <RecentCheckIns />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular summits</Text>
          <FullDetailsCard navigation={navigation} />
        </View>
      </ScrollView>
    </DismissKeyboard>
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

export default connector(HomeScreen);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
  section: {
    marginBottom: 24,
    padding: 8,
  },
  sectionTitle: {
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
  },
  separator: {
    width: 16,
  },
});

import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { ErrorOverlay, HorizontalDetailsCard } from "../../common/components";
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
      {checkIns?.map((checkIn, index) => {
        // TODO: SQL DATABASE QUERY
        const feature = MOCK_FEATURE;

        return (
          <HorizontalDetailsCard feature={feature} navigation={navigation} />
        );
      })}
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
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
});

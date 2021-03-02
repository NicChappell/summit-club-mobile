import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Input, Text } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import { colors, input, shadow } from "../../common/styles";
import { RootState } from "../../redux/reducers";
import {
  FeaturedSummits,
  InputSearchButton,
  PopularSummits,
  RecentCheckIns,
} from "./components";
import { HERO_IMAGE } from "./images";
import { IHomeScreen } from "./interfaces";

type Props = PropsFromRedux & IHomeScreen;

const HomeScreen = ({ error, navigation, route }: Props) => {
  // state hooks
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <DismissKeyboard>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ErrorOverlay error={error} />
        <View style={styles.heroContainer}>
          <ImageBackground
            source={HERO_IMAGE}
            style={styles.heroImageBackground}
          >
            <Text style={styles.heroTitle}>
              Find your{"\n"}
              next adventure
            </Text>
            <Input
              inputContainerStyle={styles.heroInputContainer}
              leftIcon={
                <Ionicons name={"ios-search"} size={24} color={colors.black} />
              }
              rightIcon={
                <InputSearchButton
                  disabled={!searchInput}
                  navigation={navigation}
                />
              }
              onChangeText={(value) => setSearchInput(value)}
              placeholder="Search summits"
            />
          </ImageBackground>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured summits</Text>
          <FeaturedSummits navigation={navigation} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent check-ins</Text>
          <RecentCheckIns />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular summits</Text>
          <PopularSummits navigation={navigation} />
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

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  heroContainer: {
    height: 224,
    marginBottom: 56,
    width: "100%",
  },
  heroInputContainer: {
    ...input,
    ...shadow,
    marginBottom: -input.height,
  },
  heroImageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
  },
  heroTitle: {
    color: colors.white,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 32,
    padding: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: -1,
    },
  },
  section: {
    marginBottom: 24,
    padding: 8,
  },
  sectionTitle: {
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
  },
});

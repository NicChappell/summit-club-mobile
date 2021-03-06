import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Input, Text } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import { colors, inputContainer, shadow } from "../../common/styles";
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
      <ScrollView style={styles.scrollView}>
        <ErrorOverlay error={error} />
        <View style={styles.heroContainer}>
          <ImageBackground
            source={HERO_IMAGE}
            style={styles.heroImageBackground}
          >
            <Input
              inputContainerStyle={styles.heroInputContainer}
              inputStyle={styles.heroInput}
              rightIcon={
                <InputSearchButton
                  disabled={!searchInput}
                  navigation={navigation}
                />
              }
              onChangeText={(value) => setSearchInput(value)}
              placeholder="Find your next adventure"
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
  heroContainer: {
    height: 224,
    marginBottom: 56,
    width: "100%",
  },
  heroInput: {
    fontFamily: "NunitoSans_400Regular",
  },
  heroInputContainer: {
    ...inputContainer,
    ...shadow,
    marginBottom: -inputContainer.height,
  },
  heroImageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
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
});

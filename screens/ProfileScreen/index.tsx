import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { ErrorOverlay } from "../../common/components";
import { colors } from "../../common/styles";
import { RootState } from "../../redux/reducers";
import { getInitials } from "./helpers";
import { IProfileScreen } from "./types";

// Profile Screen:
//     - Summits Link --> Summits Screen
//         - FlatList of Summits
//     - Contact Link --> Contact Info Screen
//         - Contact info form
//     - Account Link --> Account Info Screen
//         - username and password form
//         - sign out
//         - reset password link --> ResetPasswordScreen
//             - reset password form
//         - delete account form
//             - type the username in form field to enable button to delete acct
//     - Settings Link -> Settings Screen
//         - share my check-ins publicly
//         - future things like connecting to twitter and other accounts
//         - dark mode / light mode
//         - reset tour

type Props = PropsFromRedux & IProfileScreen;

const ProfileScreen = ({ error, navigation, route, user }: Props) => {
  // destructure user
  const { account, contact, summits } = user;

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <View style={styles.content}>
        <Avatar
          containerStyle={styles.avatarContainer}
          icon={{
            color: colors.queenBlue,
            name: "ios-person",
            type: "ionicon",
          }}
          rounded
          size={96}
          title={getInitials(contact)}
          titleStyle={styles.avatarTitle}
        />
        <ListItem
          containerStyle={[
            styles.listItemBorderBottom,
            styles.listItemBorderTop,
            styles.listItemContainer,
          ]}
          onPress={() => navigation.navigate("Summits", { summits })}
          underlayColor={colors.black25}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>
              My Summits
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron
            name="chevron-forward-outline"
            type="ionicon"
            size={20}
            color={colors.queenBlue75}
          />
        </ListItem>
        <ListItem
          containerStyle={[
            styles.listItemBorderBottom,
            styles.listItemContainer,
          ]}
          onPress={() => navigation.navigate("Contact", { contact })}
          underlayColor={colors.black25}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>
              Contact
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron
            name="chevron-forward-outline"
            type="ionicon"
            size={20}
            color={colors.queenBlue75}
          />
        </ListItem>
        <ListItem
          containerStyle={[
            styles.listItemBorderBottom,
            styles.listItemContainer,
          ]}
          onPress={() => navigation.navigate("Account", { account })}
          underlayColor={colors.black25}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>
              Account
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron
            name="chevron-forward-outline"
            type="ionicon"
            size={20}
            color={colors.queenBlue75}
          />
        </ListItem>
        <ListItem
          containerStyle={[
            styles.listItemBorderBottom,
            styles.listItemContainer,
          ]}
          onPress={() => navigation.navigate("Settings")}
          underlayColor={colors.black25}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>
              Settings
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron
            name="chevron-forward-outline"
            type="ionicon"
            size={20}
            color={colors.queenBlue75}
          />
        </ListItem>
      </View>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
    user: state.user,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProfileScreen);

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatarContainer: {
    backgroundColor: colors.white,
    borderColor: colors.queenBlue,
    borderWidth: 2,
    marginBottom: 32,
    marginTop: 16,
  },
  avatarTitle: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 36,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 16,
  },
  listItemBorderBottom: {
    borderBottomColor: colors.queenBlue25,
    borderBottomWidth: 1,
  },
  listItemBorderTop: {
    borderTopColor: colors.queenBlue25,
    borderTopWidth: 1,
  },
  listItemContainer: {
    backgroundColor: colors.white,
    width: "100%",
  },
  listItemTitle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
  },
});

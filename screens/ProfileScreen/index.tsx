import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Avatar, Button, Input, ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import { DismissKeyboard, ErrorOverlay } from "../../common/components";
import { IUser } from "../../common/interfaces";
import { colors, inputContainer } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { getInitials } from "./helpers";
import { IProfileScreen } from "./interfaces";

import { MOCK_USER } from "../../data/mocks/users";

type Props = PropsFromRedux & IProfileScreen;

const ProfileScreen = ({
  error,
  navigation,
  resetTour,
  route,
  signOut,
}: Props) => {
  // state hooks
  const [disabled, setDisabled] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  // effect hooks
  useEffect(() => {
    setUser(MOCK_USER);
  }, []);

  return (
    <DismissKeyboard>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <ErrorOverlay error={error} />
          <View style={styles.mrah}>
            <Avatar
              containerStyle={styles.avatarContainer}
              icon={{
                color: colors.queenBlue,
                name: "ios-person",
                type: "ionicon",
              }}
              rounded
              size={96}
              title={getInitials(user)}
              titleStyle={styles.avatarTitle}
            />
            <ListItem
              containerStyle={[
                styles.listItemBorderBottom,
                styles.listItemBorderTop,
                styles.listItemContainer,
              ]}
              onPress={() => navigation.navigate("Summits")}
              underlayColor={colors.black25}
            >
              <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>
                  Summits
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
              onPress={() => navigation.navigate("Contact")}
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
              onPress={() => navigation.navigate("Account")}
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
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Contact</Text>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Input
                  disabled={disabled}
                  inputContainerStyle={[
                    styles.inputContainer,
                    {
                      backgroundColor: disabled ? colors.black05 : colors.white,
                    },
                  ]}
                  inputStyle={styles.inputStyle}
                  label="First Name"
                  labelStyle={styles.labelStyle}
                  value={user?.contact.firstName}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  disabled={disabled}
                  inputContainerStyle={[
                    styles.inputContainer,
                    {
                      backgroundColor: disabled ? colors.black05 : colors.white,
                    },
                  ]}
                  inputStyle={styles.inputStyle}
                  label="Last Name"
                  labelStyle={styles.labelStyle}
                  value={user?.contact.lastName}
                />
              </View>
            </View>
            <Input
              disabled={disabled}
              inputContainerStyle={[
                styles.inputContainer,
                {
                  backgroundColor: disabled ? colors.black05 : colors.white,
                },
              ]}
              inputStyle={styles.inputStyle}
              label="Address Line 1"
              labelStyle={styles.labelStyle}
              value={user?.contact.streetAddress1}
            />
            <Input
              disabled={disabled}
              inputContainerStyle={[
                styles.inputContainer,
                {
                  backgroundColor: disabled ? colors.black05 : colors.white,
                },
              ]}
              inputStyle={styles.inputStyle}
              label="Address Line 2"
              labelStyle={styles.labelStyle}
              value={user?.contact.streetAddress2}
            />
            <Input
              disabled={disabled}
              inputContainerStyle={[
                styles.inputContainer,
                {
                  backgroundColor: disabled ? colors.black05 : colors.white,
                },
              ]}
              inputStyle={styles.inputStyle}
              label="City"
              labelStyle={styles.labelStyle}
              value={user?.contact.city}
            />
            <View style={styles.row}>
              <View style={{ flex: 1.75 }}>
                <Input
                  disabled={disabled}
                  inputContainerStyle={[
                    styles.inputContainer,
                    {
                      backgroundColor: disabled ? colors.black05 : colors.white,
                    },
                  ]}
                  inputStyle={styles.inputStyle}
                  label="State"
                  labelStyle={styles.labelStyle}
                  value={user?.contact.province}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  disabled={disabled}
                  inputContainerStyle={[
                    styles.inputContainer,
                    {
                      backgroundColor: disabled ? colors.black05 : colors.white,
                    },
                  ]}
                  inputStyle={styles.inputStyle}
                  label="Postal Code"
                  labelStyle={styles.labelStyle}
                  value={user?.contact.postalCode}
                />
              </View>
            </View>
            {disabled ? (
              <View style={styles.buttonView}>
                <Button
                  buttonStyle={styles.disabledButton}
                  containerStyle={styles.buttonContainer}
                  onPress={() => setDisabled(!disabled)}
                  title="Update"
                  titleStyle={styles.buttonTitle}
                />
              </View>
            ) : (
              <View style={styles.buttonView}>
                <Button
                  buttonStyle={styles.saveButton}
                  containerStyle={styles.buttonContainer}
                  onPress={() => setDisabled(!disabled)}
                  title="Save"
                  titleStyle={styles.buttonTitle}
                />
                <Button
                  buttonStyle={styles.cancelButton}
                  containerStyle={styles.buttonContainer}
                  onPress={() => setDisabled(!disabled)}
                  title="Cancel"
                  titleStyle={styles.cancelButtonTitle}
                  type={"outline"}
                />
              </View>
            )}
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Account</Text>
            <Input
              disabled
              inputContainerStyle={[
                styles.inputContainer,
                { backgroundColor: colors.black05 },
              ]}
              inputStyle={styles.inputStyle}
              label="Username"
              labelStyle={styles.labelStyle}
              placeholder={user?.account.username}
            />
            <Input
              disabled
              inputContainerStyle={[
                styles.inputContainer,
                { backgroundColor: colors.black05 },
              ]}
              inputStyle={styles.inputStyle}
              label="Password"
              labelStyle={styles.labelStyle}
              placeholder={"••••••••"}
              secureTextEntry={true}
            />
            <Button
              buttonStyle={styles.disabledButton}
              containerStyle={styles.buttonContainer}
              onPress={() => navigation.navigate("ResetPassword")}
              title="Reset password"
              titleStyle={styles.buttonTitle}
            />
          </View>
          <View style={styles.section}></View>
          {/* <View style={styles.row}>
            <Text>ProfileScreen</Text>
            <Button
              title="Go to Reset Password"
              onPress={() => navigation.navigate("ResetPassword")}
            />
          </View>
          <View style={styles.row}>
            <Button title="Reset tour" onPress={resetTour} />
            <Button title="Sign out" onPress={signOut} />
          </View> */}
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

const mapDispatchToProps = {
  resetTour: actions.resetTour,
  signOut: actions.signOut,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProfileScreen);

const styles = StyleSheet.create({
  mrah: {
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
  disabledButton: {
    backgroundColor: colors.queenBlue,
  },
  saveButton: {
    backgroundColor: colors.pistachio,
  },
  cancelButton: {
    borderColor: colors.queenBlue,
  },
  cancelButtonTitle: {
    color: colors.queenBlue,
  },
  buttonContainer: {
    alignItems: "flex-start",
    marginHorizontal: 8,
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  buttonView: {
    flexDirection: "row",
  },
  container: {
    padding: 16,
  },
  divider: {
    borderBottomColor: colors.queenBlue25,
    borderBottomWidth: 1,
    paddingBottom: 40,
    marginBottom: 40,
    marginHorizontal: 8,
  },
  inputContainer: {
    ...inputContainer,
  },
  inputStyle: {
    color: colors.black75,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 18,
  },
  labelStyle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    marginBottom: 4,
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
    width: "100%",
  },
  listItemTitle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
  },
  section: {},
  sectionHeader: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_700Bold",
    fontSize: 24,
    marginBottom: 16,
    marginHorizontal: 8,
  },
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
});

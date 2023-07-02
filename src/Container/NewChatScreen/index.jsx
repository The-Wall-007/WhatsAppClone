import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import { ChatList, CustomeHeaderButton, PageComponent } from "../../Components";
import { searchUser } from "../../utils/actions/userActions";
import colors from "../../Constant/colors";
import { setStoredUsers } from "../../store/userSlice";

const NewChatScreen = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomeHeaderButton}>
            <Item title="Close" onPress={() => props.navigation.goBack()} />
          </HeaderButtons>
        );
      },
      headerTitle: "New Chat",
    });
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!searchTerm || searchTerm === "") {
        setUsers();
        setNoResultsFound(false);
        return;
      }

      setIsLoading(true);

      const userResults = await searchUser(searchTerm);

      delete userResults[userData.userId];

      setUsers(userResults);

      if (Object.keys(userResults).length === 0) {
        setNoResultsFound(true);
      } else {
        dispatch(setStoredUsers({ newUsers: userResults }));
        setNoResultsFound(false);
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const onUserPressed = (userId) => {
    props.navigation.navigate("ChatListScreen", {
      selectedUserId: userId,
    });
  };

  return (
    <PageComponent>
      <View style={styles.inputContainer}>
        <FontAwesome name="search" size={13} color={colors.lightGrey} />

        <TextInput
          placeholder="Search"
          style={styles.searchBox}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      {isLoading && (
        <View style={styles.centerlize}>
          <ActivityIndicator size={"large"} color={colors.primaryColor} />
        </View>
      )}

      {!isLoading && !noResultsFound && users && (
        <FlatList
          data={Object.keys(users)}
          renderItem={(itemData) => {
            const userId = itemData.item;

            const userData = users[userId];
            const { firstName, about, profilePicture } = userData;

            return (
              <ChatList
                title={firstName}
                subTitle={about}
                profilePicture={profilePicture}
                onPress={() => onUserPressed(userId)}
              />
            );
          }}
        />
      )}

      {!isLoading && !users && (
        <View style={styles.centerlize}>
          <FontAwesome name="users" size={55} color={colors.lightGrey} />

          <Text style={styles.noResultFoundTxt}>
            Enter a name to search for a user
          </Text>
        </View>
      )}

      {!isLoading && noResultsFound && (
        <View style={styles.centerlize}>
          <FontAwesome name="question" size={55} color={colors.lightGrey} />

          <Text style={styles.noResultFoundTxt}>No user found!</Text>
        </View>
      )}
    </PageComponent>
  );
};

export default NewChatScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.extraGrey,
    paddingHorizontal: 8,
    marginVertical: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  searchBox: {
    marginLeft: 8,
    fontSize: 15,
    width: "100%",
  },
  centerlize: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultFoundTxt: {
    marginTop: 20,
    color: colors.textColor,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
});

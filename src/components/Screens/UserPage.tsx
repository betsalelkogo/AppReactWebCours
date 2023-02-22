import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import UserApi from "../api/AuthApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserProfileScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const [loader, activateLoader] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatarUri, setAvatarUri] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [screenMessage, setScreenMessage] = useState("");
  const [screenError, setScreenError] = useState("");
  let userId: string | null;
  const getMetaData = async () => {
    activateLoader(true);
    try {
      userId = await AsyncStorage.getItem("_USER_ID");
      if (!!userId) {
        const response = await UserApi.GetUserData(userId);
        if (response.ok) {
          var resData: any = response?.data;
          setUserName(resData?.userName);
          setAvatarUri(resData?.avatarUri);
          onUpdateProfile();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      activateLoader(false);
    }
  };

  const onUpdateProfile = async () => {
    //TODO: validation
    if (userName && password && password === passwordRepeat) {
      activateLoader(true);
      try {
        const response = await UserApi.UpdateUserProfile(
          userName,
          password,
          avatarUri,
          userId as string
        );
        var resData: any = response?.data;
        if (resData?.flag) {
          setScreenMessage("Great, your profile has been updated!");
        } else {
          setScreenError("Something went wrong updating your profile");
        }
      } catch (error) {
        console.log(error);
      } finally {
        activateLoader(false);
      }
    } else {
      setScreenError("Wrong Credentials");
    }
  };

  useEffect(() => {
    getMetaData();
  });
  const onCancellCallback = () => {
    navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {avatarUri == "" && (
            <Image
              source={require("../assets/avatar.png")}
              style={styles.avatar}
            ></Image>
          )}
          {avatarUri != "" && (
            <Image
              source={{ uri: avatarUri + "" }}
              style={styles.avatar}
            ></Image>
          )}
        </View>

        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
          placeholder={"User Name"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder={"Your Password"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPasswordRepeat}
          value={passwordRepeat}
          placeholder={"Your Password Repeat"}
        />

        <View style={styles.buttonesContainer}>
          <TouchableOpacity onPress={onCancellCallback} style={styles.button}>
            <Text style={styles.buttonText}>RETURN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
    width: "100%",
  },
  cameraButton: {
    position: "absolute",
    bottom: -10,
    left: 10,
    width: 50,
    height: 50,
  },
  galleryButton: {
    position: "absolute",
    bottom: -10,
    right: 10,
    width: 50,
    height: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonesContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 12,
    padding: 12,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});
export default UserProfileScreen;

import React, { FC, useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationScreens } from "../enum/index";
import {
  InputComponent,
  ButtonComponent,
  SocialButtons,
  ScreenLoaderComponent,
} from "../components/index";
import UserApi from "../api/UserApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
//import app_icon from "../assets/app_icon.png";
export const SignInScreen: FC<{}> = () => {
  const [loader, activateLoader] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [screenError, setScreenError] = useState("");
  const [userAvatar, setUserAvatr] = useState("");
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  const navigation = useNavigation();
  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId:
        "1000063937594-5m8o054oau13p58o03g4ggnmlvqbu3db.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: "", // [Android] specifies an account name on the device that should be used
      iosClientId: "<FROM DEVELOPER CONSOLE>", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120,
    });
  }, []);

  const signInOnLoading = async () => {
    activateLoader(true);
    try {
      const uId = await AsyncStorage.getItem("_USER_ID");
      const rfsTkn = await AsyncStorage.getItem("_REFRESH_TKN");
      if (!!uId) {
        const response = await UserApi.LoginUserOnLoading(
          uId,
          rfsTkn as string
        );
        if (response.ok) {
          setStorage(response.data);
          navigation.navigate(NavigationScreens.TabNavigator as never);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      activateLoader(false);
    }
  };

  const onSignInPressed = async () => {
    console.log("SignIn");
    try {
      const response = await UserApi.LoginUser(userName, password);
      console.log("SignIn- " + response.data, userName, password);
      if (response.ok) {
        console.log(response.data);
        setStorage(response.data);
        navigation.navigate(NavigationScreens.TabNavigator as never);
      }
    } catch (error: any) {
      setScreenError(error?.response?.data?.messgae);
      console.log(error);
    }
  };

  const setStorage = (data: any) => {
    AsyncStorage.setItem("_ACCESS_TKN", data?.access_token);
    AsyncStorage.setItem("_REFRESH_TKN", data?.refresh_token);
    AsyncStorage.setItem("_USER_ID", data._id);
  };

  const onSignUp = () => {
    console.log("sign up");
    navigation.navigate(NavigationScreens.SignUp as never);
  };

  const onSignInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info --> ", userInfo);
      setUserAvatr(userInfo.user.photo as string);
      setUserName(
        ((userInfo.user.familyName as string) +
          userInfo.user.givenName) as string
      );
    } catch (error: any) {
      console.log("Message", JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("Play Services Not Available or Outdated");
      } else {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    signInOnLoading();
    console.log("test");
  }, []);

  const { height } = useWindowDimensions();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        {loader ? (
          <ScreenLoaderComponent />
        ) : (
          <View>
            <Image
              source={{ uri: "asset:/app_icon.png" }}
              style={[styles.logo, { height: height * 0.3 }]}
              resizeMode="contain"
            />
            <InputComponent
              placeholder="userName"
              value={userName}
              setValue={setUserName}
              minLength={"L"}
            />
            <InputComponent
              placeholder="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              minLength={"L"}
            />
            <Text style={styles.error}>{screenError}</Text>
            <ButtonComponent
              minLength={"L"}
              text="Sign In"
              onPress={onSignInPressed}
            />
            <GoogleSigninButton
              style={{ width: 312, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={onSignInGoogle}
            />
            <ButtonComponent
              text="Create Account"
              onPress={onSignUp}
              type="tertiary"
              minLength={"L"}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 25,
  },

  container: {
    minWidth: 300,
  },

  logo: {
    width: 700,
    maxHeight: 200,
    maxWidth: 300,
  },

  error: {
    color: "tomato",
    fontSize: 14,
  },
});

export default SignInScreen;

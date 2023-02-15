import React from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useState, FC, useEffect } from "react";
import UserApi from "../api/UserApi";
import { Component } from "react";
import { LoginButton, AccessToken } from "react-native-fbsdk";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";
export default class LoginFacBook extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log("login has error: " + result.error);
            } else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log("logout.")}
        />
      </View>
    );
  }
}

export default class LoginGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigninInProgress: false,
      userInfo: null,
    };
    GoogleSignin.configure({
      scopes: [], // what API you want to access
      webClientId: "add yor webclient here",
      offlineAccess: true,
      hostedDomain: "",
      forceConsentPrompt: true,
      accountName: "",
    });
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("_____userinfo", userInfo);
      this.setState({ userInfo });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log("login has error: " + result.error);
            } else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log("logout.")}
        />
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            this.signIn();
          }}
          disabled={this.state.isSigninInProgress}
        />
      </View>
    );
  }
}

const Login: FC<{ route: any; navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogInCallback = async () => {
    try {
      await UserApi.login(email, password);
    } catch (err) {
      console.log("fail to login: " + err);
    }
    navigation.navigate("PostsList", {
      userEmail: email,
    });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text>Hello Please Log In...</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder={"User Email"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder={"Password"}
        />
        <View style={styles.buttonesContainer}>
          <TouchableOpacity onPress={onLogInCallback} style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
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

export default Login;

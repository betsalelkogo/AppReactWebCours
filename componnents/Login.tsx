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

const Login: FC<{ route: any; navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onExitlCallback = () => {
    navigation.goBack();
  };
  const onLogInCallback = () => {
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
          <TouchableOpacity onPress={onExitlCallback} style={styles.button}>
            <Text style={styles.buttonText}>EXIT</Text>
          </TouchableOpacity>
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

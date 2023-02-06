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

const Register: FC<{ route: any; navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cPassword, setCPassword] = useState("");
  const onExitlCallback = () => {
    navigation.goBack();
  };
  const onLogInCallback = async () => {
    if (cPassword === password) {
      try {
        await UserApi.login(email, password);
      } catch (err) {
        console.log("fail to register: " + err);
      }
      navigation.navigate("PostsList", {
        userEmail: email,
      });
    }
    alert("Check your password and try again");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text>Hello Please Register...</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder={"User Name"}
        />
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
        <TextInput
          style={styles.input}
          onChangeText={setCPassword}
          value={cPassword}
          placeholder={"Confirmed Password"}
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

export default Register;

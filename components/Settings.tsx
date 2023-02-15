import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MyColors from "../MyColors";
import ChatRoom from "./ChatRoom";
import UserPage from "./UserPage";

const Settings: FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 10,
          borderBottomWidth: 2,
          borderBottomColor: "black",
          marginRight: 10,
        }}
      >
        <FontAwesome5 name={"rocketchat"} color={"black"} size={24} />
        <Text style={{ color: "black", fontSize: 20 }} onPress={ChatRoom}>
          Chat Room
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 10,
          borderBottomWidth: 2,
          borderBottomColor: "black",
          marginRight: 10,
        }}
      >
        <Entypo name={"user"} color={"black"} size={24} />
        <Text style={{ color: "black", fontSize: 20 }} onPress={UserPage}>
          User Page
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 10,
          borderBottomWidth: 2,
          borderBottomColor: "black",
          marginRight: 10,
        }}
      >
        <AntDesign name={"logout"} color={"black"} size={24} />
        <Text style={{ color: "black", fontSize: 20 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.background,
  },
});

export default Settings;

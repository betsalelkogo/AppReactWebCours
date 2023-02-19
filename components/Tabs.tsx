import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, View, Image } from "react-native";
import Home from "../screen/Home";
import Settings from "./Settings";
import AddPost from "../screen/PostAdd";
import MyColors from "../MyColors";
import ChatRoom from "../screen/ChatRoom";
import Profile from "../screen/UserPage";
import React, { Dispatch, FC, SetStateAction } from "react";

const customHeader = () => {
  return (
    <View
      style={{
        backgroundColor: MyColors.background,
        alignItems: "center",
        justifyContent: "center",
        height: 60,
      }}
    >
      <Image
        source={require("../assets/app_icon.png")}
        style={{
          height: 70,
        }}
        resizeMode={"center"}
      />
    </View>
  );
};

const TabsStack = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: any;
          let iconSize: any = 25;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Chat") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          } else if (route.name === "Post") {
            iconName = "add-circle";
            iconSize = 45;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: MyColors.primary,
        tabBarInactiveTintColor: "rgba(200, 200, 200, 1)",
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "white",
          borderRadius: 15,
          height: 70,
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
        },
        tabBarHideOnKeyboard: true,
        header: customHeader,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={ChatRoom} />
      <Tab.Screen name="Post" component={AddPost} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default TabsStack;

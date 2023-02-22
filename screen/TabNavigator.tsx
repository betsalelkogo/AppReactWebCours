import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabNavigationScreens } from "../enum";
import { Ionicons } from "@expo/vector-icons";
import HomePageScreen from "./HomePageScreen";
import MyPostList from "./MyPostsList";
import UserProfileScreen from "./UserPage";
import ChatScreen from "./ChatRoom";
import LogOutScreen from "./Logout";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import PostsList from "./PostsList";
import PostDetails from "./PostDetails";
import PostAdd from "./PostAdd";
import PostEdit from "./PostEdit";

export const Tab = createBottomTabNavigator();
const PostStack = createNativeStackNavigator();
const PostStackCp: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const addNewPosts = () => {
    navigation.navigate("PostAdd");
  };
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name="Posts List"
        component={PostsList}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={addNewPosts}>
              <Ionicons name={"add-outline"} size={40} color={"gray"} />
            </TouchableOpacity>
          ),
        }}
      />
      <PostStack.Screen name="Post Details" component={PostDetails} />
      <PostStack.Screen name="Post Edit" component={PostEdit} />
      <PostStack.Screen name="Chat Room" component={ChatScreen} />
      <PostStack.Screen name="Profile" component={UserProfileScreen} />
      <PostStack.Screen name="My Posts List" component={MyPostList} />
    </PostStack.Navigator>
  );
};

export const TabNavigatorScreen: FC<{}> = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={"Home"}
        component={PostStackCp}
        options={{
          tabBarIcon: () => (
            <Ionicons name="md-home" size={24} color={"#8e8e93"} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={TabNavigationScreens.Myposts}
        component={MyPostList}
        options={{
          tabBarIcon: () => (
            <Ionicons name="md-list" size={24} color={"#8e8e93"} />
          ),
        }}
      />
      <Tab.Screen
        name={TabNavigationScreens.UserProfile}
        component={UserProfileScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="md-person-circle-outline"
              size={24}
              color={"#8e8e93"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNavigationScreens.ChatScreen}
        component={ChatScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="md-chatbox" size={24} color={"#8e8e93"} />
          ),
        }}
      />
      <Tab.Screen
        name={TabNavigationScreens.LogOut}
        component={LogOutScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="md-log-out" size={24} color={"#8e8e93"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorScreen;

import { FC, useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import PostsList from "./componnents/PostsList";
import PostDetails from "./componnents/PostDetails";
import PostAdd from "./componnents/PostAdd";
import MyPostList from "./componnents/MyPostsList";
import PostEdit from "./componnents/PostEdit";
import Login from "./componnents/Login";
import UserHomePage from "./componnents/UserPage";
import Register from "./componnents/Register";
import ChatRoom from "./componnents/ChatRoom";
const MyPostScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>My Posts</Text>
    </View>
  );
};

const PostStack = createNativeStackNavigator();
const PostStackCp: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const addNewPost = () => {
    navigation.navigate("PostAdd");
  };
  return (
    <PostStack.Navigator>
      <PostStack.Screen name="Register" component={Register} />
      <PostStack.Screen name="Login" component={Login} />
      <PostStack.Screen
        name="PostsList"
        component={PostsList}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={addNewPost}>
              <Ionicons name={"add-outline"} size={40} color={"gray"} />
            </TouchableOpacity>
          ),
        }}
      />
      <PostStack.Screen name="PostsDetails" component={PostDetails} />
      <PostStack.Screen name="PostEdit" component={PostEdit} />
      <PostStack.Screen name="PostAdd" component={PostAdd} />
      <PostStack.Screen name="UserHomePage" component={UserHomePage} />
      <PostStack.Screen name="ChatRoom" component={ChatRoom} />
    </PostStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const App: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";
            if (route.name === "MyPosts") {
              iconName = focused
                ? "information-circle"
                : "information-circle-outline";
            } else if (route.name === "PostStackCp") {
              iconName = focused ? "list-circle" : "list-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="PostStackCp"
          component={PostStackCp}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="MyPosts" component={MyPostList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "grey",
  },
});

export default App;

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

const InfoScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Info Screen</Text>
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
      <PostStack.Screen name="PostDetails" component={PostDetails} />
      <PostStack.Screen name="PostAdd" component={PostAdd} />
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
            if (route.name === "InfoScreen") {
              iconName = focused
                ? "information-circle"
                : "information-circle-outline";
            } else if (route.name === "PostStackCp") {
              iconName = focused ? "list-circle" : "list-circle-outline";
            }

            // You can return any component that you like here!
            return (
              <Ionicons name={iconName.toString()} size={size} color={color} />
            );
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
        <Tab.Screen name="InfoScreen" component={InfoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// const App: FC = () => {
//   return (
//     <StudentDetails></StudentDetails>
//   )
// };

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "grey",
  },
});

export default App;

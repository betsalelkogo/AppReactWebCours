import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllPostsScreen from "../Screens/ListPost";
import AddPostScreen from "../Screens/AddPost";
import MyProfileScreen from "../Screens/UserPage";
import { theme } from "../Core/theme";
import ChatScreen from "../Screens/ChatRoom";

const Tab = createBottomTabNavigator();

const AuthNavigationContainer = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          switch (route.name) {
            case "Posts List":
              iconName = "newspaper-outline";
              break;
            case "Add Post":
              iconName = "add-outline";
              break;
            case "User Page":
              iconName = "person-outline";
              break;
            case "Chat Room":
              iconName = "chatbubbles-outline";
              break;
            default:
              iconName = "help-outline";
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={25}
              color={focused ? theme.colors.iconFocused : color}
              style={{ marginTop: 10 }}
            />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name={"Posts List"}
        component={AllPostsScreen}
        options={{
          title: "Posts List",
          headerShown: true,
        }}
      />
      <Tab.Screen
        name={"Add Post"}
        component={AddPostScreen}
        options={{
          title: "Add Post",
          headerShown: true,
        }}
      />
      <Tab.Screen
        name={"Chat Room"}
        component={ChatScreen}
        options={{
          title: "Chat Room",
          headerShown: true,
        }}
      />
      <Tab.Screen
        name={"User Page"}
        component={MyProfileScreen}
        options={{
          title: "User Page",
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AuthNavigationContainer;

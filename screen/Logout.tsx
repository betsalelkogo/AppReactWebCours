import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import UserApi from "../api/UserApi";
import { ScreenLoaderComponent } from "../components";
import { NavigationScreens } from "../enum/index";
const LogOutScreen: FC<{}> = () => {
  const [loader, activateLoader] = useState(false);
  const navigation = useNavigation();

  const logOut = async () => {
    activateLoader(true);
    try {
      const userId = await AsyncStorage.getItem("_USER_ID");
      if (!!userId) {
        const response = await UserApi.LogOut(userId);
        if (!!response) {
          AsyncStorage.clear();
          navigation.navigate(NavigationScreens.SignIn as never);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      activateLoader(false);
    }
  };
  useEffect(() => {
    logOut();
  }, []);

  return <View>{loader ? <ScreenLoaderComponent /> : <View />}</View>;
};

export default LogOutScreen;

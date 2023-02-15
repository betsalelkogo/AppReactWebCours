import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { FC } from "react";

import Auth from "./components/Auth";
import Tabs from "./components/Tabs";

const App: FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  return (
    <NavigationContainer>
      <Tabs route={route} navigation={navigation} />
    </NavigationContainer>
  );
};

export default App;

import { NavigationContainer } from "@react-navigation/native";
import { Loading } from "../helper/Loading";
import { useAuth } from "../helper/AuthContext";

import AuthStack from "../screen/Auth";
import TabsStack from "./Tabs";

export const Router = () => {
  const { authData, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {authData?.status == 200 ? <TabsStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

import { View, ActivityIndicator } from "react-native";
import MyColors from "../MyColors";

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: MyColors.background,
      }}
    >
      <ActivityIndicator
        color={MyColors.primary}
        animating={true}
        size="large"
      />
    </View>
  );
};

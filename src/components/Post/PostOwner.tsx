import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

interface Props {
  name: string;
  avatar: string;
}

const PostOwnerInfo = ({ avatar, name }: Props) => (
  <View style={styles.container}>
    <Avatar.Image
      size={42}
      source={avatar ? { uri: avatar } : require("../../assets/post.png")}
    />
    <Text style={styles.text}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  text: {
    paddingLeft: 5,
  },
});

export default PostOwnerInfo;

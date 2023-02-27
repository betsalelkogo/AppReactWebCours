import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

interface Props {
  name: string;
}

const PostOwnerInfo = ({ name }: Props) => (
  <View style={styles.container}>
    <Text style={styles.text}>User Name posted: {name}</Text>
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

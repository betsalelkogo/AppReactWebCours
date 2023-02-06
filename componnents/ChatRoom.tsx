import { FC, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button,
  Text,
  ScrollView,
} from "react-native";
import PostModel, { Post } from "../model/PostModel";

const ChatRoom: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const [post, setPost] = useState<Post>();
  const postId = JSON.stringify(route.params.postId);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("focus");
      try {
        const post1 = await PostModel.getPostById(postId);
        setPost(post1);
        console.log("fetching post complete");
      } catch (err) {
        console.log("fail fetching post " + err);
      }
      console.log("fetching finish");
    });
    return unsubscribe;
  }, [post]);
  const onCancellCallback = () => {
    navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {post?.image == "" && (
            <Image
              source={require("../assets/ava.png")}
              style={styles.avatar}
            ></Image>
          )}
          {post?.image != "" && (
            <Image
              source={{ uri: post?.image + "" }}
              style={styles.avatar}
            ></Image>
          )}
        </View>

        <Text>{post?.title}</Text>
        <Text>{post?.detail}</Text>

        <View style={styles.buttonesContainer}>
          <TouchableOpacity onPress={onCancellCallback} style={styles.button}>
            <Text style={styles.buttonText}>RETURN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
    width: "100%",
  },
  cameraButton: {
    position: "absolute",
    bottom: -10,
    left: 10,
    width: 50,
    height: 50,
  },
  galleryButton: {
    position: "absolute",
    bottom: -10,
    right: 10,
    width: 50,
    height: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonesContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 12,
    padding: 12,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});

export default ChatRoom;

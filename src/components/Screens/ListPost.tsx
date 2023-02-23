// import { Text, View } from "react-native";

// const AllPostsScreen = () => {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>All Posts</Text>
//     </View>
//   );
// };

// export default AllPostsScreen;

import { FC, useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native";

import PostModel, { Post } from "../../model/PostModel";

const ListItem: FC<{
  _id: String;
  userId: String;
  text: String;
  image: String;
  onRowSelected: (id: String) => void;
}> = ({ _id, userId, text, image, onRowSelected }) => {
  const onClick = () => {
    console.log("int he row: row was selected " + _id);
    onRowSelected(_id);
  };

  console.log("image: " + image);
  return (
    <TouchableHighlight onPress={onClick} underlayColor={"gainsboro"}>
      <View style={styles.listRow}>
        {image == undefined && (
          <Image
            style={styles.listRowImage}
            source={require("../../assets/post.png")}
          />
        )}
        {image != "" && (
          <Image style={styles.listRowImage} source={{ uri: image + "" }} />
        )}

        <View style={styles.listRowTextContainer}>
          <Text style={styles.listRowName}>{text}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const PostList: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const onRowSelected = (id: String) => {
    console.log("in the list: row was selected " + id);
    navigation.navigate("PostDetails", { PostId: id });
  };

  const [posts, setPosts] = useState<Array<Post>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("focus");
      let posts: Post[] = [];
      try {
        posts = await PostModel.getAllPosts();
        console.log("fetching posts complete");
      } catch (err) {
        console.log("fail fetching posts " + err);
      }
      console.log("fetching finish");
      setPosts(posts);
    });
    return unsubscribe;
  });

  return (
    <FlatList
      style={styles.flatlist}
      data={posts}
      keyExtractor={(post) => post._id.toString()}
      renderItem={({ item }) => (
        <ListItem
          text={item.text}
          image={item.image}
          onRowSelected={onRowSelected}
          _id={item._id}
          userId={item.userId}
        />
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "grey",
  },
  flatlist: {
    flex: 1,
  },
  listRow: {
    margin: 4,
    flexDirection: "row",
    height: 150,
    elevation: 1,
    borderRadius: 2,
  },
  listRowImage: {
    margin: 10,
    resizeMode: "contain",
    height: 130,
    width: 130,
  },
  listRowTextContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "space-around",
  },
  listRowName: {
    fontSize: 15,
  },
  listRowId: {
    fontSize: 25,
  },
});

export default PostList;

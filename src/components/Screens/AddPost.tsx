import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { TextInput } from "react-native-paper";
import postApi from "../../api/PostApi";
import { Post } from "../../utils/types/@Post";
import { theme } from "../Core/theme";
import Button from "../Shared/Button";

import AppImagePicker from "../Shared/ImagePicker";
import Title from "../Shared/Header";

interface Props {
  route: any;
  navigation: any;
}

const AddEditPostScreen = ({ route, navigation }: Props) => {
  const [post, setPost] = useState<Post>({ text: "", image: "" });

  const [errorMsg, setErrorMsg] = useState<string>("");

  const [existingPostId, setExistingPostId] = useState<false | string>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetForm = () => {
    setPost({ text: "", image: "" });
    setExistingPostId(false);
  };

  const handleSubmitPost = async () => {
    if (!post.text) {
      setErrorMsg("Post description is required!");
      return;
    }

    if (!post.image) {
      setErrorMsg("Post image is required!");
      return;
    }
    setIsLoading(true);

    if (existingPostId) {
      await handleEditPost();
      navigation.navigate("Posts List");
    } else {
      await handleCreatePost();
      navigation.navigate("Posts List");
    }

    setIsLoading(false);
  };
  const handleCancelPost = async () => {
    setIsLoading(true);
    if (existingPostId) {
      await handleDeletePost();
      navigation.navigate("Posts List");
    } else {
      Alert.alert("Cancel!");
      navigation.navigate("Posts List");
    }

    setIsLoading(false);
  };

  const handleDeletePost = async () => {
    if (existingPostId) {
      console.log("Delete Post");
      const res = await postApi.deletePost(existingPostId, {
        delete: true,
      });
      const data: Post | any = res.data;
      console.log(res.ok, data._id);
      if (data._id) {
        handleResetForm();
        Alert.alert("Post was deleted successfully!");
      }
    }
  };
  const handleEditPost = async () => {
    if (existingPostId) {
      const imageUrl = await postApi.uploadImage(
        post.image || "",
        existingPostId
      );
      if (imageUrl) {
        const res = await postApi.editPost(existingPostId, {
          image: imageUrl,
          text: post.text,
        });
        const data: Post | any = res.data;

        if (data._id) {
          handleResetForm();
          Alert.alert("Post was updated successfully!");
          navigation.navigate("Posts List");
        }
      }
    }
  };

  const handleCreatePost = async () => {
    const res = await postApi.addPost({ text: post.text });
    const newPostData: Post | any = res.data;
    console.log("Creat Post" + newPostData._id);
    if (newPostData._id) {
      console.log("Creat Post1");
      const imageUrl = await postApi.uploadImage(
        post.image || "",
        newPostData._id
      );

      if (imageUrl) {
        console.log("Creat Post2");
        const res = await postApi.editPost(newPostData._id, {
          image: imageUrl,
        });
        const data: Post | any = res.data;

        if (data._id) {
          handleResetForm();
          Alert.alert("Post created successfully!");
        } else {
          Alert.alert("Post not created!");
        }
      }
    }
  };

  const handleChange = (field: "text" | "image", value: string) => {
    if (errorMsg) {
      setErrorMsg("");
    }
    switch (field) {
      case "image":
        setPost((prevState) => ({ ...prevState, image: value }));
        break;
      case "text":
        setPost((prevState) => ({ ...prevState, text: value }));
        break;
      default:
        break;
    }
  };

  const handleGetPost = async () => {
    if (route?.params) {
      const { postId } = route.params;

      const res = await postApi.getPostById(postId);
      if (res.data) {
        const postData = res.data as Post;
        if (postData.image && postData.text && postData._id) {
          setPost({ image: postData?.image || "", text: postData?.text || "" });
          setExistingPostId(postData._id);
        }
      }
    }
  };

  useEffect(() => {
    handleGetPost();
  }, [route.params]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Title>{existingPostId ? "Edit Post" : "Add New Post"}</Title>

        <AppImagePicker
          image={post.image || ""}
          setImage={(image: string) => handleChange("image", image)}
          previewSize={250}
          disabled={isLoading}
        />
        {errorMsg && (
          <Text style={{ color: "red", fontSize: 16 }}>{errorMsg}</Text>
        )}
        <TextInput
          multiline
          numberOfLines={5}
          style={styles.input}
          autoFocus={false}
          placeholder="Your Post..."
          value={post.text}
          onChangeText={(value: string) => handleChange("text", value)}
          disabled={isLoading}
        />

        <View style={{ marginTop: 6 }}>
          <Button
            title={existingPostId ? "Edit Post" : "Submit Post"}
            onPress={handleSubmitPost}
            disabled={isLoading}
            color={isLoading ? theme.colors.darkGrey : undefined}
          />
        </View>
        <View style={{ marginTop: 6 }}>
          <Button
            title={existingPostId ? "Delete Post" : "Cancel"}
            onPress={handleCancelPost}
            disabled={isLoading}
            color={isLoading ? theme.colors.darkGrey : undefined}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "70%",
    height: 100,
    backgroundColor: theme.colors.lightGrey,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AddEditPostScreen;

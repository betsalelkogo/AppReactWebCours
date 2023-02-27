import { useEffect, useState } from "react";

import AllPosts from "../Post/PostsList";

import postApi from "../../api/PostApi";

import { Post } from "../../utils/types/@Post";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import AppLoading from "../Shared/AppLoading";

interface Props {
  navigation: any;
}

const AllPostsScreen = ({ navigation }: Props) => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreatePost = (postId?: string) => {
    navigation.navigate("Add Post", {
      postId,
    });
  };

  const onRefresh = () => {
    getAllPosts();
  };

  const getAllPosts = async (): Promise<Post[]> => {
    setIsLoading(true);
    const res = await postApi.getAllPosts();
    setIsLoading(false);
    if (Array.isArray(res.data)) {
      setAllPosts(res.data as Post[]);
      return res.data as Post[];
    }
    return [];
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <AppLoading isLoading={isLoading} />

        <AllPosts posts={allPosts} navToCreatePost={handleCreatePost} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AllPostsScreen;

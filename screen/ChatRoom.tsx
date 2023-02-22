import React, { FC } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { HeadLineComponent } from "../components";

const ChatScreen: FC<{}> = () => {
  return (
    <ScrollView>
      <View style={styles.root}>
        <HeadLineComponent value="Welcome to Chat Screen!" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 25,
  },
});

export default ChatScreen;

import React, { FC } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const ChatScreen: FC<{}> = () => {
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text>Welcome to Chat Screen!</Text>
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

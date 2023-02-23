import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../Core/theme";

interface Props {
  text: string;
}

const Title = ({ text }: Props) => {
  return <Text style={styles.header}>{text}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: "#1679d3",
    fontWeight: "bold",
    paddingVertical: 12,
  },
});

export default Title;

import React from "react";
import { View, StyleSheet } from "react-native";

import AppBar from "../components/AppBar";
import MemoList from "../components/MemoList";
import CircleButton from "../components/CircleButton";

export default function MemoListScreen() {
  return (
    <View style={styles.container}>
      <AppBar />
      <MemoList />
      <CircleButton>+</CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex 1:画面いっぱいに表示する
    flex: 1,
    backgroundColor: "#F0F4F8",
    // 横中央揃え
    // alignItems: "center",
    // 縦中央揃え
    // justifyContent: "center",
  },
});

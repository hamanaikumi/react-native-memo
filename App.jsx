import { StyleSheet, View } from "react-native";
import React from "react";

import AppBar from "./src/components/AppBar";
import MemoList from "./src/components/MemoList";
import CircleButton from "./src/components/CircleButton";

export default function App() {
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

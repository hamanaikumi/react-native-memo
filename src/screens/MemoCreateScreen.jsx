import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import AppBar from "../components/AppBar";
import CircleButton from "../components/CircleButton";
import KeyboardSafeView from "../components/KeyboardSafeView";

export default function MemoCreateScreen() {
  return (
    // チェックボタンをキーボードで隠れないようにする
    <KeyboardSafeView style={styles.container} behavior="height">
      <AppBar />
      <View style={styles.inputContainer}>
        <TextInput value="" multiline style={styles.input} />
      </View>
      <CircleButton name="check" />
    </KeyboardSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    // 余白を画面いっぱいに広げる
    flex: 1,
  },
  input: {
    // 余白を画面いっぱいに広げる
    flex: 1,
    // Android,iOSのレイアウト統一のため
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  },
});

import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import firebase from "firebase";

import CircleButton from "../components/CircleButton";
import KeyboardSafeView from "../components/KeyboardSafeView";
import { translateError } from "../utils";

export default function MemoCreateScreen(props) {
  const { navigation } = props;

  const [bodyText, setBodyText] = useState("");

  const handlePress = () => {
    // ログインしているユーザーを取得
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    // ユーザーごとにcollectionを分ける
    const ref = db.collection(`users/${currentUser.uid}/memos`);
    ref
      .add({
        bodyText,
        updatedAt: new Date(),
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        const errorMsg = translateError(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      });
  };
  return (
    // チェックボタンをキーボードで隠れないようにする
    <KeyboardSafeView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => {
            setBodyText(text);
          }}
          value={bodyText}
          multiline
          style={styles.input}
          // 自動でキーボードが立ち上がる
          autoFocus
        />
      </View>
      <CircleButton name="check" onPress={handlePress} />
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

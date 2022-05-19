import { string, shape } from "prop-types";
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import firebase from "firebase";

import CircleButton from "../components/CircleButton";
import KeyboardSafeView from "../components/KeyboardSafeView";
import { translateError } from "../utils";

export default function MemoEditScreen(props) {
  const { navigation, route } = props;
  const { id, bodyText } = route.params;

  const [body, setBody] = useState(bodyText);

  const handlePress = () => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      // データの上書き
      ref
        .set(
          {
            bodyText: body,
            updatedAt: new Date(),
          },
          // 上書きされないデータが消えないように宣言
          { merge: true }
        )
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          const errorMsg = translateError(error.code);
          Alert.alert(errorMsg.title, errorMsg.description);
        });
    }
  };

  return (
    // チェックボタンをキーボードで隠れないようにする
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          onChangeText={(text) => {
            setBody(text);
          }}
          multiline
          style={styles.input}
        />
      </View>
      <CircleButton name="check" onPress={handlePress} />
    </KeyboardSafeView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({
      id: string,
      bodyText: string,
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
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
    // スクロールバーの調整
    paddingTop: 32,
    paddingHorizontal: 27,
    paddingVertical: 32,
  },
});

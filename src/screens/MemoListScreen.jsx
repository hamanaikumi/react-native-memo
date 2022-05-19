import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import firebase from "firebase";

import MemoList from "../components/MemoList";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";

export default function MemoListScreen(props) {
  const { navigation } = props;

  const [memos, setMemos] = useState([]);

  useEffect(() => {
    // ログアウトボタン
    navigation.setOptions({
      // 関数で返す
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    // 空のfunction
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db
        .collection(`users/${currentUser.uid}/memos`)
        // 日付が新しい順
        .orderBy("updatedAt", "desc");
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userMemos = [];
          snapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
            const data = doc.data();
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              // timestamp型からDateに変換
              updatedAt: data.updatedAt.toDate(),
            });
          });
          setMemos(userMemos);
        },
        (error) => {
          console.log(error);
          Alert.alert("データの読み込みに失敗しました");
          // eslint-disable-next-line comma-dangle
        }
      );
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate("MemoCreate");
        }}
      />
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

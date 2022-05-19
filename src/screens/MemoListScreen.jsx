import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import firebase from "firebase";

import MemoList from "../components/MemoList";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";
import Button from "../components/Button";
import Loading from "../components/Loading";

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  const [isLoading, setLoading] = useState(false);

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
      // ローディング開始
      setLoading(true);

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

          // ローディング終了
          setLoading(false);
        },
        (error) => {
          console.log(error);
          // ローディング終了
          setLoading(false);
          Alert.alert("データの読み込みに失敗しました");
          // eslint-disable-next-line comma-dangle
        }
      );
    }
    return unsubscribe;
  }, []);

  if (memos.length === 0) {
    return (
      <View style={emptyStyle.container}>
        <Loading isLoading={isLoading} />
        <View style={emptyStyle.inner}>
          <Text style={emptyStyle.title}>最初のメモを作成しよう!</Text>
          {/* propsでstyle渡す */}
          <Button
            style={emptyStyle.button}
            label="作成する"
            onPress={() => {
              navigation.navigate("MemoCreate");
            }}
          />
        </View>
      </View>
    );
  }

  // もしメモ0件だったら下のreturn以降は表示されない
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

const emptyStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: "center",
  },
});

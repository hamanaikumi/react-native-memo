import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { shape, string } from "prop-types";
import firebase from "firebase";
// index.js は省略可能
import { dateToString } from "../utils";

import CircleButton from "../components/CircleButton";

export default function MeMoDetailScreen(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  const [memo, setMemo] = useState(null);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const db = firebase.firestore();
      // idでmemoを抽出
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      unsubscribe = ref.onSnapshot((doc) => {
        const data = doc.data();
        setMemo({
          id: doc.id,
          bodyText: data.bodyText,
          updatedAt: data.updatedAt.toDate(),
        });
      });
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        {/* && ＝ memoがnullでなかった場合表示 */}
        <Text style={styles.MemoTitle} numberOfLines={1}>
          {memo && memo.bodyText}
        </Text>
        <Text style={styles.memoDate}>
          {dateToString(memo && memo.updatedAt)}
        </Text>
      </View>
      <View>
        <ScrollView style={styles.memoBody}>
          <Text style={styles.memoText}>{memo && memo.bodyText}</Text>
        </ScrollView>
      </View>
      <CircleButton
        onPress={() => {
          navigation.navigate("MemoEdit", {
            id: memo.id,
            bodyText: memo.bodyText,
          });
        }}
        style={{ top: 60, bottom: "auto" }}
        name="pencil"
      />
    </View>
  );
}

MeMoDetailScreen.propTypes = {
  route: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  memoHeader: {
    height: 96,
    backgroundColor: "#467FD3",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  MemoTitle: {
    color: "#ffffff",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
  },
  memoDate: {
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingHorizontal: 27,
    paddingTop: 32,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

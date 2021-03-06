import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { shape, string, instanceOf, arrayOf } from "prop-types";
import firebase from "firebase";

import Icon from "./Icon";
import { dateToString } from "../utils";

export default function MemoList(props) {
  const { memos } = props;
  const navigation = useNavigation();

  const deleteMemo = (id) => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      Alert.alert("メモを削除します", "よろしいですか？", [
        { text: "キャンセル", onPress: () => {} },
        {
          text: "削除する",
          style: "destructive",
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert("削除に失敗しました");
            });
          },
        },
      ]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.memoListItem}
      onPress={() => {
        // 第二引数のデータ、route.paramsとして渡される
        navigation.navigate("MemoDetail", { id: item.id });
      }}
    >
      <View style={styles.memoInner}>
        {/* 1行で表示 */}
        <Text style={styles.memoListItemTitle} numberOfLines={1}>
          {item.bodyText}
        </Text>
        <Text style={styles.memoListItemDate}>
          {dateToString(item.updatedAt)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.memoDelete}
        onPress={() => {
          deleteMemo(item.id);
        }}
      >
        <Icon name="delete" size={16} color="#B0B0B0" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

MemoList.propTypes = {
  // 配列の型定義
  memos: arrayOf(
    shape({
      id: string,
      bodyText: string,
      updatedAt: instanceOf(Date),
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  memoListItem: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.15)",
  },
  memoInner: {
    // 可能な限りスペースを確保
    flex: 1,
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
  memoDelete: {
    padding: 8,
  },
});

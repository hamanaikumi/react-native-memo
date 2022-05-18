import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import CircleButton from "../components/CircleButton";

export default function MeMoDetailScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.MemoTitle}>買い物リスト</Text>
        <Text style={styles.memoDate}>2022年5月17日 10:00</Text>
      </View>
      <View>
        <ScrollView style={styles.memoBody}>
          <Text style={styles.memoText}>
            買い物リスト 書体やレイアウトなどを確認するために用います。
            本文用なので使い方を間違えると不自然に見えることもありますので要注意。
          </Text>
        </ScrollView>
      </View>
      <CircleButton
        onPress={() => {
          navigation.navigate("MemoEdit");
        }}
        style={{ top: 60, bottom: "auto" }}
        name="pencil"
      />
    </View>
  );
}

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

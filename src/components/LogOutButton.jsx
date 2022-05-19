import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function LogOutButton() {
  // hooksはfunction内に書いてはダメ
  const navigation = useNavigation();

  const handlePress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // 成功時、特に返ってくるものはない
        navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      })
      .catch(() => {
        Alert.alert("ログアウトに失敗しました");
      });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.label}>ログアウト</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
});

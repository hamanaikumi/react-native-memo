import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Button from "../components/Button";

export default function LoginScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput style={styles.input} value="email address" />
        <TextInput style={styles.input} value="password" />

        <Button
          label="Submit"
          onPress={() => {
            // stack navigationの履歴を消して、0番目に登録している画面に遷移
            navigation.reset({ index: 0, routes: [{ name: "MemoList" }] });
          }}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({ index: 0, routes: [{ name: "SignUp" }] });
            }}
          >
            <Text style={styles.footerLink}>Sign up here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4F8" },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    paddingHorizontal: 8,
    marginBottom: 16,
    // フォームのスタイル
    borderColor: "#DDDDDD",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
  },

  footer: {
    flexDirection: "row",
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467FD3",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "firebase";
import { translateError } from "../utils";

import Button from "../components/Button";
import Loading from "../components/Loading";

export default function LoginScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);

  // 画面が最小に表示された時
  useEffect(() => {
    // ユーザーの状態を監視
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // ログインしていた場合
      if (user) {
        // stack navigationの履歴を消して、0番目に登録している画面に遷移
        navigation.reset({ index: 0, routes: [{ name: "MemoList" }] });
      } else {
        // 判定中にローディングを走らせる
        setLoading(false);
      }
    });
    // 画面が消える主観に監視を止める
    return unsubscribe;
  }, []);

  const handlePress = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // stack navigationの履歴を消して、0番目に登録している画面に遷移
        navigation.reset({ index: 0, routes: [{ name: "MemoList" }] });
      })
      .catch((error) => {
        const errorMsg = translateError(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      })
      // 成功でも失敗でもローディング終了
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="Email Address"
          // 頭文字を大文字にしない
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          placeholder="Password"
          // パスワードを伏せ字に
          secureTextEntry
          textContentType="password"
        />

        <Button label="Submit" onPress={handlePress} />

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

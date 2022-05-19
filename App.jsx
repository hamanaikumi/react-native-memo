import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import firebase from "firebase";
import { LogBox } from "react-native";

import MemoListScreen from "./src/screens/MemoListScreen";
import MeMoDetailScreen from "./src/screens/MemoDetailScreen";
import MemoEditScreen from "./src/screens/MemoEditScreen";
import MemoCreateScreen from "./src/screens/MemoCreateScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

// firebase関連
import { firebaseConfig } from "./env";

require("firebase/firestore");

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

LogBox.ignoreLogs([""]);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // 最初の画面
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#467FD3" },
          headerTitleStyle: { color: "#ffffff" },
          headerTitle: "Memo App",
          // 戻るボタン
          headerTintColor: "#ffffff",
          headerBackTitle: "Back",
          // 画面遷移を横スライドに（IOSの挙動に統一）
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // スワイプで戻る設定（Android用）
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="MemoList" component={MemoListScreen} />
        <Stack.Screen name="MemoDetail" component={MeMoDetailScreen} />
        <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          // 画面遷移を縦スライドに
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          // 画面遷移を縦スライドに
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

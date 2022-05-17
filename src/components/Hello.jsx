import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { string, bool, shape } from "prop-types";

function Hello(props) {
  // 分割代入（非構造化＝構造の中から値を取り出す）
  const { children, bang, style } = props;

  return (
    <View>
      {/* 配列を使ってstyleの上書き */}
      <Text style={[styles.text, style]}>
        {`Hello ${children}${bang ? "!" : ""}`}
      </Text>
    </View>
  );
}

// propType
Hello.propTypes = {
  // 必須項目かどうかも記述する
  children: string.isRequired,
  bang: bool,
  //   shape = styleの定義ができる
  style: shape(),
};

// propが渡ってこなかった時の初期値(requiredでない)
Hello.defaultProps = { bang: false, style: null };

// style
const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    backgroundColor: "blue",
    // pxなしでOK
    fontSize: 40,
    fontWeight: "bold",
    padding: 16,
  },
});

export default Hello;

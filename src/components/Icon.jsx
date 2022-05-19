import React from "react";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts } from "@use-expo/font";
import { string, number, oneOf } from "prop-types";
// コンポーネントは後ろに
import icomoon from "../../assets/fonts/icomoon.ttf";
import selection from "../../assets/fonts/selection.json";

export default function Icon(props) {
  const [fontLoaded] = useFonts({ icomoon });
  const { name, size, color } = props;
  const CustomIcon = createIconSetFromIcoMoon(selection);
  if (!fontLoaded) {
    return null;
  }
  return (
    <CustomIcon
      name={name}
      size={size}
      color={color}
      //  Androidのズレ修正用
      style={{ lineHeight: size - 1 }}
    />
  );
}

Icon.propTypes = {
  // oneOf:いずれかの値になるか
  name: oneOf(["plus", "delete", "pencil", "check"]).isRequired,
  size: number,
  color: string,
};

Icon.defaultProps = {
  size: 24,
  color: "#000000",
};

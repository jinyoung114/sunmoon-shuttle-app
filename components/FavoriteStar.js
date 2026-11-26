import React from "react";
import { Image, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import styles, { STAR_COLOR } from "../styles/FavoriteStar.styles";

// Keep the supplied outline unchanged; fill its center underneath it when selected.
export default function FavoriteStar({ selected = false, style }) {
  return (
    <View style={[styles.icon, style]} pointerEvents="none" accessible={false}>
      {selected && <Svg style={styles.layer} width="100%" height="100%" viewBox="0 0 539 512">
        <Polygon points="269,65 329,200 475,216 356,315 387,466 269,391 151,466 182,315 64,216 209,200" fill={STAR_COLOR} />
      </Svg>}
      <Image source={require("../assets/favorite-star.png")} resizeMode="contain" style={styles.layer} />
    </View>
  );
}

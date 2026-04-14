import { Pressable, StyleSheet, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";

type StarButtonProps = {
  onPress?: () => void;
  size?: number;
  filled?: boolean;
};

export default function StarButton({
  onPress,
  size = 64,
  filled = true,
}: StarButtonProps) {
  const points = `
    50,5
    61,35
    95,35
    67,57
    78,91
    50,70
    22,91
    33,57
    5,35
    39,35
  `;

  return (
    <Pressable onPress={onPress} style={styles.button}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          <Polygon
            points={points}
            fill={filled ? "#f59e0b" : "transparent"}
            stroke="#757371"
            strokeWidth={4}
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});

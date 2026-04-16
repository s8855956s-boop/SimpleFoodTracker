import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type FoodLogItemRowProps = {
  name: string;
  calories?: number;
  protein?: number;
  totalCarb?: number;
  totalFat?: number;
  amount?: number;
  unit?: "grams" | "servings";
};

export default function FoodLogItemRow(props: FoodLogItemRowProps) {
  const router = useRouter();

  const unitToText = (unit: "grams" | "servings") => {
    switch (unit) {
      case "grams":
        return "克";
      case "servings":
        return "份";
      default:
        return "";
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push("/foodItemPage")}
    >
      <View style={styles.titleContainer}>
        <Text>{props.name}</Text>
        <Text style={styles.subTitle}>
          {props.calories?.toString() || "0"} 大卡、{props.amount}{" "}
          {unitToText(props.unit)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/foodItemPage")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e4e4e4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
  },
  subTitle: {
    color: "#6b7280",
    fontSize: 12,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
    marginLeft: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 22,
  },
});

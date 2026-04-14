import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type FoodLogProps = {
  title: string;
  totalCalories?: number;
  foodItems?: string[];
};

export default function FoodLog(props: FoodLogProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push("/foodItemPage")}
    >
      <View style={styles.circle}>
        <Text>{props.totalCalories?.toString() || "0"}</Text>
        <Text>大卡</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text>{props.title}</Text>
        <Text style={styles.subTitle}>{props.foodItems?.join(", ") || ""}</Text>
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

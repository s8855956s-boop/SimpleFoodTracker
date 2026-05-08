import { FoodLogItem } from "@/type/type";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MealFoodRow from "./mealFoodRow";

type MealFoodRowContainerProps = {
  foodLogItems: FoodLogItem[];
};

export default function MealFoodRowContainer(props: MealFoodRowContainerProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {props.foodLogItems.map((item) => (
        <View key={item.id} style={{ width: "100%" }}>
          <MealFoodRow
            title={item.name}
            totalCalories={item.totalCalories}
            portion={item.portion.toString()}
            unit={item.unit}
          />
          <View style={styles.separator} />
        </View>
      ))}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text>新增食物</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/foodItemPage")}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: "5%",
    width: "90%",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  separator: {
    backgroundColor: "#848484",
    height: 1,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
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

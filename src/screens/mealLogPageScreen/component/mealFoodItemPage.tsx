import { FoodLogItem } from "@/type/type";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity, View,
} from "react-native";

type FoodItemPageProps = {
  foodLogItems: FoodLogItem[];
  selected?: boolean;
  onToggle?: () => void;
  handlePortionChange?: (newPortion: number) => void;
  handleUnitChange?: (newUnit: "grams" | "servings") => void;
};

export default function MealFoodItemPage(item: FoodItemPageProps) {
  const router = useRouter();
  const foodLogItems = item.foodLogItems;

  return (
    <View style={styles.container}>
      {foodLogItems.map((item) => (
      <View key={item.id} style={styles.foodItemRow}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={() => {
            router.push({
              pathname: "/foodItemDetail",
              params: {
                id: item.id,
                name: item.name,
                portion: String(item.amount),
                unit: item.unit,
                gramsPerServing: String(item.gramsPerServing),
                calories: String(item.totalCalories),
                totalFat: String(item.totalFat),
                totalCarb: String(item.totalCarb),
                protein: String(item.totalProtein),
              },
            });
          }}
        >
          <Text>{item.name}</Text>
          <Text style={styles.subTitle}>
            {item.caloriesPerServing * item.amount}大卡{" "}
            {item.unit &&
              `${item.amount} ${item.unit === "grams" ? "克" : "份"}`}
                </Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
      ))
    }
      <View style={styles.foodItemRow}>
        <TouchableOpacity
          style={styles.titleContainer && {paddingBottom: 20}}
          onPress={() => {
            router.push({
              pathname: "/foodItemPage",
            });
          }}
        >
          <Text style={{ color: "#111827", fontWeight: "bold" }}>新增食物</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  foodItemRow: {
    width: "100%",
    paddingTop: 10
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 2,
    borderColor: "#9ca3af",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    borderColor: "#7a7a7a",
  },
  checkboxInner: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "#7a7a7a",
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "#e4e4e4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: "column",
    // flex: 1,
    paddingBottom: 10,
    width: "100%",
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
  separator: {
    height: 1,
    backgroundColor: "#848484",
    marginVertical: 4,
  },
});

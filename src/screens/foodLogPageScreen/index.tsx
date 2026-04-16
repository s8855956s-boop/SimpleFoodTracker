import { StyleSheet, Text, View } from "react-native";
import FoodLogItemsContainer from "./component/foodLogItemsContainer";
import NutritionInfo from "./component/nutritionInfo";

export default function FoodLogPageScreen() {
  const foodLogItems = [
    {
      name: "早餐",
      calories: 500,
      protein: 30,
      totalCarb: 50,
      totalFat: 20,
      amount: 1,
      unit: "servings" as "servings",
    },
    {
      name: "午餐",
      calories: 800,
      protein: 40,
      totalCarb: 60,
      totalFat: 30,
      amount: 1,
      unit: "servings" as "servings",
    },
  ];

  return (
    <View style={[styles.container, { marginTop: "5%" }]}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        2024/04/16
      </Text>
      <Text style={{ fontSize: 32, fontWeight: "bold" }}>早餐</Text>
      <NutritionInfo />
      <FoodLogItemsContainer foodLogItems={foodLogItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

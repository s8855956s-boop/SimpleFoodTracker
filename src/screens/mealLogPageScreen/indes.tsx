import { FoodLogItem } from "@/type/type";
import { StyleSheet, Text, View } from "react-native";
import MealFoodRowContainer from "./component/mealFoodRowContainer";
import MealTotalNutritionFacts from "./component/mealTotalNutritionFacts";

const foodLogItems: FoodLogItem[] = [
  {
    id: "1",
    name: "豆腐",
    portion: 2,
    unit: "servings" as "servings",
    gramsPerServing: 150,
    caloriesPerServing: 80,
    totalCalories: 160,
    fatPerServing: 4,
    carbPerServing: 44,
    proteinPerServing: 20,
    totalFat: 2,
    totalCarb: 22,
    totalProtein: 10,
  },
];

export default function MealLogPageScreen() {
  const totalCalories = foodLogItems.reduce(
    (sum, item) => sum + item.caloriesPerServing * item.portion,
    0,
  );

  const totalCarb = foodLogItems.reduce(
    (sum, item) => sum + item.carbPerServing * item.portion,
    0,
  );

  const totalFat = foodLogItems.reduce(
    (sum, item) => sum + item.fatPerServing * item.portion,
    0,
  );

  const totalProtein = foodLogItems.reduce(
    (sum, item) => sum + item.proteinPerServing * item.portion,
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        早餐
      </Text>
      <MealTotalNutritionFacts
        calories={totalCalories}
        totalCarb={totalCarb}
        totalFat={totalFat}
        protein={totalProtein}
      />
      <MealFoodRowContainer foodLogItems={foodLogItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    alignItems: "center",
  },
});

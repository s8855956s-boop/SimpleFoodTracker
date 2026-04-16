import { FoodItem } from "@/type/type";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import NutritionFactsBox from "./component/nutritionFactsBox";
import PortionBox from "./component/portionBox";

export default function FoodItemDetailScreen() {
  const [unit, setUnit] = useState<"grams" | "servings">("servings");

  const foodItem: FoodItem = {
    name: "備餐",
    gramsPerServing: 100,
    calories: 721,
    totalCarb: 71.3,
    totalFat: 25.9,
    protein: 50.7,
  };

  return (
    <View style={styles.container}>
      <PortionBox
        unit={unit}
        handleUnitChange={setUnit}
        gramsPerServing={foodItem.gramsPerServing}
        foodTitle={foodItem.name}
        calories={foodItem.calories}
        totalCarb={foodItem.totalCarb}
        totalFat={foodItem.totalFat}
        protein={foodItem.protein}
      />
      <NutritionFactsBox
        calories={foodItem.calories}
        totalCarb={foodItem.totalCarb}
        totalFat={foodItem.totalFat}
        protein={foodItem.protein}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

import { FoodItem } from "@/type/type";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import NutritionFactsBox from "./component/nutritionFactsBox";
import PortionBox from "./component/portionBox";

export default function FoodItemDetailScreen() {
  const [unit, setUnit] = useState<"grams" | "servings">("servings");
  const [foodItem, setFoodItem] = useState<FoodItem>({
    id: "",
    name: "",
    gramsPerServing: 0,
    calories: 0,
    totalFat: 0,
    totalCarb: 0,
    protein: 0,
  });

  const {
    id,
    name,
    gramsPerServing: gramsPerServingStr,
    calories: caloriesStr,
    totalFat: totalFatStr,
    totalCarb: totalCarbStr,
    protein: proteinStr,
  } = useLocalSearchParams<{
    id: string;
    name: string;
    gramsPerServing: string;
    calories: string;
    totalFat: string;
    totalCarb: string;
    protein: string;
  }>();

  useEffect(() => {
    if (
      id &&
      name &&
      gramsPerServingStr &&
      caloriesStr &&
      totalFatStr &&
      totalCarbStr &&
      proteinStr
    ) {
      setFoodItem({
        id,
        name,
        gramsPerServing: Number(gramsPerServingStr),
        calories: Number(caloriesStr),
        totalFat: Number(totalFatStr),
        totalCarb: Number(totalCarbStr),
        protein: Number(proteinStr),
      });
    }
  }, [
    id,
    name,
    gramsPerServingStr,
    caloriesStr,
    totalFatStr,
    totalCarbStr,
    proteinStr,
  ]);

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

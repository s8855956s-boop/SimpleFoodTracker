import { getFoodItemByIds } from "@/db/db";
import { FoodLogItem } from "@/type/type";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MealFoodItemPage from "./component/mealFoodItemPage";
import MealTotalNutritionFacts from "./component/mealTotalNutritionFacts";

// const foodLogItems: FoodLogItem[] = [
//   {
//     id: "1",
//     name: "豆腐",
//     amount: 2,
//     unit: "servings" as "servings",
//     gramsPerServing: 150,
//     caloriesPerServing: 80,
//     totalCalories: 160,
//     fatPerServing: 4,
//     carbPerServing: 44,
//     proteinPerServing: 20,
//     totalFat: 2,
//     totalCarb: 22,
//     totalProtein: 10,
//   },
//   {
//     id: "2",
//     name: "白飯",
//     amount: 2,
//     unit: "servings" as "servings",
//     gramsPerServing: 100,
//     caloriesPerServing: 100,
//     totalCalories: 200,
//     fatPerServing: 6,
//     carbPerServing: 77,
//     proteinPerServing: 33,
//     totalFat: 5,
//     totalCarb: 13,
//     totalProtein: 6,
//   },
// ];

export default function MealLogPage() {
  const [foodLogItems, setFoodLogItems] = useState<FoodLogItem[]>([]);
  
  const { toBeFetchedFoodItemsObjStr } = useLocalSearchParams<{ toBeFetchedFoodItemsObjStr: string }>();

  useEffect(() => {
    const fetchFoodItems = async () => {
      const toBeFetchedFoodItems: { id: string; portion: number; unit: "grams" | "servings" }[] = JSON.parse(toBeFetchedFoodItemsObjStr);
      const fetchedItems = (await getFoodItemByIds(toBeFetchedFoodItems.map(item => item.id))).map(item => {
        const unit = toBeFetchedFoodItems.find(i => i.id === item.id)?.unit || "servings";
        const portion = toBeFetchedFoodItems.find(i => i.id === item.id)?.portion || 1;
        return {
          id: item.id,
          name: item.name,
          unit: unit as "grams" | "servings",
          gramsPerServing: item.gramsPerServing,
          caloriesPerServing: item.calories,
          fatPerServing: item.totalFat,
          carbPerServing: item.totalCarb,
          proteinPerServing: item.protein,
          totalCalories: item.calories * portion,
          totalFat: item.totalFat * portion,
          totalCarb: item.totalCarb * portion,
          totalProtein: item.protein * portion,
          amount: portion,
        };
      });
      setFoodLogItems(fetchedItems);
    };
    fetchFoodItems();
  }, [toBeFetchedFoodItemsObjStr]);

  const totalCalories = foodLogItems.reduce(
    (sum, item) => sum + item.totalCalories * item.amount,
    0,
  );

  const totalCarb = foodLogItems.reduce(
    (sum, item) => sum + item.totalCarb * item.amount,
    0,
  );

  const totalFat = foodLogItems.reduce(
    (sum, item) => sum + item.totalFat * item.amount,
    0,
  );

  const totalProtein = foodLogItems.reduce(
    (sum, item) => sum + item.totalProtein * item.amount,
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
      <View style={styles.foodItemContainer}>
        <MealFoodItemPage foodLogItems={foodLogItems} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    alignItems: "center",
  },
  foodItemContainer: {
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: "5%",
    width: "90%",
    alignItems: "flex-start",
    flexDirection: "column",
  },
});

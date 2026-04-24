import { getAllFoodItems, initializeDatabase } from "@/db/db";
import FoodItemPageScreen from "@/screens/foodItemPageScreen";
import { FoodItem } from "@/type/type";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

export default function FoodItemPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    void initializeDatabase();
  }, []);

  const loadfoodItems = useCallback(async () => {
    const dbFoodItems = await getAllFoodItems();
    const mockFoodItems: FoodItem[] = [
      {
        id: "1",
        name: "Apple",
        gramsPerServing: 182,
        calories: 95,
        protein: 0.5,
        totalCarb: 25,
        totalFat: 0.3,
      },
      {
        id: "2",
        name: "Chicken Breast",
        gramsPerServing: 100,
        calories: 165,
        protein: 31,
        totalCarb: 0,
        totalFat: 3.6,
      },
      {
        id: "3",
        name: "Broccoli",
        gramsPerServing: 100,
        calories: 55,
        protein: 3.7,
        totalCarb: 11,
        totalFat: 0.6,
      },
      {
        id: "4",
        name: "Brown Rice",
        gramsPerServing: 100,
        calories: 215,
        protein: 5,
        totalCarb: 45,
        totalFat: 1.8,
      },
      {
        id: "5",
        name: "Salmon",
        gramsPerServing: 100,
        calories: 280,
        protein: 25,
        totalCarb: 0,
        totalFat: 17,
      },
      {
        id: "6",
        name: "Banana",
        gramsPerServing: 118,
        calories: 105,
        protein: 1.3,
        totalCarb: 27,
        totalFat: 0.3,
      },
      {
        id: "7",
        name: "Eggs",
        gramsPerServing: 50,
        calories: 155,
        protein: 13,
        totalCarb: 1.1,
        totalFat: 11,
      },
      {
        id: "8",
        name: "Almonds",
        gramsPerServing: 28,
        calories: 579,
        protein: 21,
        totalCarb: 22,
        totalFat: 50,
      },
      {
        id: "9",
        name: "Spinach",
        gramsPerServing: 30,
        calories: 23,
        protein: 2.9,
        totalCarb: 3.6,
        totalFat: 0.4,
      },
      {
        id: "10",
        name: "Sweet Potato",
        gramsPerServing: 100,
        calories: 103,
        protein: 1.6,
        totalCarb: 24,
        totalFat: 0.1,
      },
      {
        id: "11",
        name: "Greek Yogurt",
        gramsPerServing: 100,
        calories: 100,
        protein: 17,
        totalCarb: 7,
        totalFat: 0.4,
      },
      {
        id: "12",
        name: "Avocado",
        gramsPerServing: 100,
        calories: 160,
        protein: 2,
        totalCarb: 9,
        totalFat: 15,
      },
      {
        id: "13",
        name: "Oats",
        gramsPerServing: 100,
        calories: 389,
        protein: 16.7,
        totalCarb: 66.3,
        totalFat: 6.9,
      },
      {
        id: "14",
        name: "Blueberries",
        gramsPerServing: 100,
        calories: 57,
        protein: 0.7,
        totalCarb: 14,
        totalFat: 0.3,
      },
      {
        id: "15",
        name: "Tuna",
        gramsPerServing: 100,
        calories: 132,
        protein: 29,
        totalCarb: 0,
        totalFat: 1.3,
      },
    ];
    setFoodItems([...dbFoodItems]);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadfoodItems();
    }, [loadfoodItems]),
  );

  return (
    <View
      style={{
        backgroundColor: "#e4e4e4",
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FoodItemPageScreen foodItems={foodItems} />
    </View>
  );
}

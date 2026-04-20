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
    setFoodItems(await getAllFoodItems());
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

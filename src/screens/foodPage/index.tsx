import { FoodLog } from "@/type/type";
import { StyleSheet, View } from "react-native";
import FoodLogsContainer from "./components/foodLogsContainer";
import TotalCaloriesInfo from "./components/totalCaloriesInfo";
import TotalNutritionInfo from "./components/totalNutritionInfo";

export default function FoodPage() {
  const foodLogs: FoodLog[] = [
    {
      id: 1,
      date: new Date("2024-06-01"),
      title: "breakfast",
      totalCalories: 500,
      foodItems: [
        {
          name: "蛋餅",
          unit: "servings",
          amount: 1,
          calories: 300,
          totalCarb: 30,
          totalFat: 10,
          protein: 15,
        },
        {
          name: "牛奶",
          unit: "grams",
          amount: 200,
          calories: 200,
          totalCarb: 20,
          totalFat: 8,
          protein: 10,
        },
      ],
    },
    {
      id: 2,
      date: new Date("2024-06-01"),
      title: "lunch",
      totalCalories: 700,
      foodItems: [
        {
          name: "便當",
          unit: "grams",
          amount: 300,
          calories: 700,
          totalCarb: 70,
          totalFat: 20,
          protein: 30,
        },
      ],
    },
    {
      id: 3,
      date: new Date("2024-06-01"),
      title: "dinner",
      totalCalories: 650,
      foodItems: [
        {
          name: "雞胸肉沙拉",
          unit: "grams",
          amount: 250,
          calories: 400,
          totalCarb: 18,
          totalFat: 12,
          protein: 42,
        },
        {
          name: "地瓜",
          unit: "grams",
          amount: 150,
          calories: 250,
          totalCarb: 45,
          totalFat: 1,
          protein: 4,
        },
      ],
    },
    {
      id: 4,
      date: new Date("2024-06-01"),
      title: "snack",
      totalCalories: 180,
      foodItems: [
        {
          name: "香蕉",
          unit: "servings",
          amount: 1,
          calories: 90,
          totalCarb: 23,
          totalFat: 0,
          protein: 1,
        },
        {
          name: "無糖優格",
          unit: "grams",
          amount: 100,
          calories: 90,
          totalCarb: 6,
          totalFat: 3,
          protein: 8,
        },
      ],
    },
  ];

  const totalCalories = foodLogs.reduce(
    (sum, log) => sum + log.totalCalories,
    0,
  );

  return (
    <View style={styles.container}>
      <TotalCaloriesInfo calories={totalCalories} />
      <TotalNutritionInfo
        totalCarb={foodLogs.reduce(
          (sum, log) =>
            sum +
            log.foodItems.reduce(
              (itemSum, item) => itemSum + item.totalCarb,
              0,
            ),
          0,
        )}
        totalFat={foodLogs.reduce(
          (sum, log) =>
            sum +
            log.foodItems.reduce((itemSum, item) => itemSum + item.totalFat, 0),
          0,
        )}
        protein={foodLogs.reduce(
          (sum, log) =>
            sum +
            log.foodItems.reduce((itemSum, item) => itemSum + item.protein, 0),
          0,
        )}
      />
      <FoodLogsContainer foodLogs={foodLogs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#848484",
    marginVertical: 4,
  },
});

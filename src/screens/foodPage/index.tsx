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
          id: "1",
          name: "蛋餅",
          portion: 1,
          unit: "servings",
          gramsPerServing: 200,
          caloriesPerServing: 300,
          fatPerServing: 10,
          carbPerServing: 30,
          proteinPerServing: 15,
          totalCalories: 300,
          totalCarb: 30,
          totalFat: 10,
          totalProtein: 15,
        },
        {
          id: "2",
          name: "牛奶",
          portion: 1,
          unit: "servings",
          gramsPerServing: 200,
          caloriesPerServing: 200,
          fatPerServing: 8,
          carbPerServing: 20,
          proteinPerServing: 10,
          totalCalories: 200,
          totalCarb: 20,
          totalFat: 8,
          totalProtein: 10,
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
          id: "3",
          name: "便當",
          portion: 1,
          unit: "servings",
          gramsPerServing: 300,
          caloriesPerServing: 700,
          fatPerServing: 20,
          carbPerServing: 70,
          proteinPerServing: 30,
          totalCalories: 700,
          totalCarb: 70,
          totalFat: 20,
          totalProtein: 30,
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
          id: "4",
          name: "雞胸肉沙拉",
          portion: 1,
          unit: "servings",
          gramsPerServing: 250,
          caloriesPerServing: 400,
          fatPerServing: 12,
          carbPerServing: 18,
          proteinPerServing: 42,
          totalCalories: 400,
          totalCarb: 18,
          totalFat: 12,
          totalProtein: 42,
        },
        {
          id: "5",
          name: "地瓜",
          portion: 1,
          unit: "servings",
          gramsPerServing: 150,
          caloriesPerServing: 250,
          fatPerServing: 1,
          carbPerServing: 45,
          proteinPerServing: 4,
          totalCalories: 250,
          totalCarb: 45,
          totalFat: 1,
          totalProtein: 4,
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
          id: "6",
          name: "香蕉",
          portion: 1,
          unit: "servings",
          gramsPerServing: 100,
          caloriesPerServing: 90,
          fatPerServing: 0,
          carbPerServing: 23,
          proteinPerServing: 1,
          totalCalories: 90,
          totalCarb: 23,
          totalFat: 0,
          totalProtein: 1,
        },
        {
          id: "7",
          name: "無糖優格",
          portion: 1,
          unit: "servings",
          gramsPerServing: 100,
          caloriesPerServing: 90,
          fatPerServing: 3,
          carbPerServing: 6,
          proteinPerServing: 8,
          totalCalories: 90,
          totalCarb: 6,
          totalFat: 3,
          totalProtein: 8,
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
            log.foodItems.reduce(
              (itemSum, item) => itemSum + item.totalProtein,
              0,
            ),
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

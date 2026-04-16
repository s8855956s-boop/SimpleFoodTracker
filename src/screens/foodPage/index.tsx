import { FoodLog, FoodLogItem } from "@/type/type";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { StyleSheet, View } from "react-native";
import { food_log, food_log_item } from "../../../db/schema";
import FoodLogsContainer from "./components/foodLogsContainer";
import TotalCaloriesInfo from "./components/totalCaloriesInfo";
import TotalNutritionInfo from "./components/totalNutritionInfo";

export default function FoodPage() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const foodLogResult = drizzleDb
    .select()
    .from(food_log)
    .leftJoin(food_log_item, eq(food_log.id, food_log_item.food_log_id))
    .where(eq(food_log.date, today))
    .all();

  const logsMap = new Map<
    number,
    {
      id: number;
      date: string;
      title: string;
      totalCalories: number;
      foodItems: FoodLogItem[];
    }
  >();

  foodLogResult.forEach(({ food_log: log, food_log_item: item }) => {
    if (!logsMap.has(log.id)) {
      logsMap.set(log.id, {
        id: log.id,
        date: log.date,
        title: log.title,
        totalCalories: log.total_calories,
        foodItems: [],
      });
    }

    if (item) {
      logsMap.get(log.id)!.foodItems.push({
        name: item.name,
        unit: item.unit as "grams" | "servings",
        amount: item.amount,
        calories: item.calories,
        totalFat: item.total_fat,
        totalCarb: item.total_carb,
        protein: item.protein,
      });
    }
  });

  const foodLogs: FoodLog[] = Array.from(logsMap.values()).map((log) => ({
    id: log.id,
    date: new Date(log.date),
    title: log.title,
    totalCalories: log.totalCalories,
    foodItems: log.foodItems,
  }));

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

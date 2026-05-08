import { FoodLog } from "@/type/type";
import { StyleSheet, Text, View } from "react-native";
import FoodLogsContainer from "./components/foodLogsContainer";
import TotalCaloriesInfo from "./components/totalCaloriesInfo";
import TotalNutritionInfo from "./components/totalNutritionInfo";

type FoodPageProps = {
  date: string;
  foodLogs: FoodLog[];
};

export default function FoodPage(props: FoodPageProps) {
  const { date, foodLogs = [] } = props;

  const totalCalories = foodLogs.reduce(
    (sum, log) => sum + log.totalCalories,
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{date}</Text>
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
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#848484",
    marginVertical: 4,
  },
});

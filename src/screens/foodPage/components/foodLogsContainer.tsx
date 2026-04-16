import { FoodLog } from "@/type/type";
import { StyleSheet, View } from "react-native";
import FoodLogRow from "./foodLogRow";

type FoodLogsContainerProps = {
  foodLogs: FoodLog[];
};

export default function FoodLogsContainer(props: FoodLogsContainerProps) {
  return (
    <View style={styles.container}>
      <FoodLogRow
        title="早餐"
        totalCalories={
          props.foodLogs.filter((log) => log.title === "breakfast")[0]
            ?.totalCalories || 0
        }
        foodItems={
          props.foodLogs
            .filter((log) => log.title === "breakfast")[0]
            ?.foodItems.map((foodItem) => foodItem.name) || []
        }
      />
      <View style={styles.separator} />
      <FoodLogRow
        title="午餐"
        totalCalories={
          props.foodLogs.filter((log) => log.title === "lunch")[0]
            ?.totalCalories || 0
        }
        foodItems={
          props.foodLogs
            .filter((log) => log.title === "lunch")[0]
            ?.foodItems.map((foodItem) => foodItem.name) || []
        }
      />
      <View style={styles.separator} />
      <FoodLogRow
        title="晚餐"
        totalCalories={
          props.foodLogs.filter((log) => log.title === "dinner")[0]
            ?.totalCalories || 0
        }
        foodItems={
          props.foodLogs
            .filter((log) => log.title === "dinner")[0]
            ?.foodItems.map((foodItem) => foodItem.name) || []
        }
      />
      <View style={styles.separator} />
      <FoodLogRow
        title="點心"
        totalCalories={
          props.foodLogs.filter((log) => log.title === "snack")[0]
            ?.totalCalories || 0
        }
        foodItems={
          props.foodLogs
            .filter((log) => log.title === "snack")[0]
            ?.foodItems.map((foodItem) => foodItem.name) || []
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: "10%",
    width: "90%",
  },
  separator: {
    height: 1,
    backgroundColor: "#848484",
    marginVertical: 4,
  },
});

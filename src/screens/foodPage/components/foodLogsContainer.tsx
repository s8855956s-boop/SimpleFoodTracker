import { FoodLog } from "@/type/type";
import { StyleSheet, View } from "react-native";
import FoodLogRow from "./foodLogRow";

type FoodLogsContainerProps = {
  foodLogs: FoodLog[];
};

export default function FoodLogsContainer(props: FoodLogsContainerProps) {
  return (
    <View style={styles.container}>
      {props.foodLogs.map((foodLog, index) => (
        <View key={foodLog.title}>
          <FoodLogRow
            title={foodLog.title}
            totalCalories={foodLog.totalCalories}
            foodItems={foodLog.foodItems.map((foodItem) => foodItem.name)}
          />
          {index < props.foodLogs.length - 1 ? (
            <View style={styles.separator} />
          ) : null}
        </View>
      ))}
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

import { FoodLogItem } from "@/type/type";
import { StyleSheet, View } from "react-native";
import FoodLogItemRow from "./foodLogItemRow";

type FoodLogsContainerProps = {
  foodLogItems: FoodLogItem[];
};

export default function FoodLogItemsContainer(props: FoodLogsContainerProps) {
  return (
    <View style={styles.container}>
      {props.foodLogItems.map((item, index) => (
        <View key={index}>
          <FoodLogItemRow
            name={item.name}
            calories={item.calories}
            protein={item.protein}
            totalCarb={item.totalCarb}
            totalFat={item.totalFat}
            amount={item.amount}
            unit={item.unit}
          />
          <View style={styles.separator} />
        </View>
      ))}
      <FoodLogItemRow name="新增食物" />
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

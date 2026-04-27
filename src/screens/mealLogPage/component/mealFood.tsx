import { FoodItem } from "@/type/type";
import { StyleSheet, Text, View } from "react-native";

export default function MealFood(props: FoodItem) {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        總熱量：{props.calories ? props.calories : 0} 大卡
      </Text>
      <Text>
        碳水化合物 {props.totalCarb ? props.totalCarb : 0} 克、脂肪{" "}
        {props.totalFat ? props.totalFat : 0} 克、蛋白質{" "}
        {props.protein ? props.protein : 0} 克
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: "5%",
    width: "90%",
    alignItems: "flex-start",
    flexDirection: "column",
  },
});

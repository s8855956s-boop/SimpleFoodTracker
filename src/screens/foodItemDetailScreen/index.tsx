import { StyleSheet, View } from "react-native";
import NutritionFactsBox from "./component/nutritionFactsBox";
import PortionBox from "./component/portionBox";

type FoodItemDetails = {
  name: string;
  calories: number;
  totalFat: number;
  totalCarb: number;
  protein: number;
};

export default function FoodItemDetailScreen() {
  const foodItem: FoodItemDetails = {
    name: "備餐",
    calories: 721,
    totalCarb: 71.3,
    totalFat: 25.9,
    protein: 50.7,
  };

  return (
    <View style={styles.container}>
      <PortionBox
        foodTitle={foodItem.name}
        calories={foodItem.calories}
        totalCarb={foodItem.totalCarb}
        totalFat={foodItem.totalFat}
        protein={foodItem.protein}
      />
      <NutritionFactsBox
        calories={foodItem.calories}
        totalCarb={foodItem.totalCarb}
        totalFat={foodItem.totalFat}
        protein={foodItem.protein}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e4e4e4",
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
});

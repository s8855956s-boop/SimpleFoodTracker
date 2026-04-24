import { FoodItem } from "@/type/type";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NutritionFactsBox from "./component/nutritionFactsBox";
import PortionBox from "./component/portionBox";

const getInitialUnit = (unit?: string): "grams" | "servings" =>
  unit === "grams" || unit === "servings" ? unit : "servings";

const getInitialPortion = (portion?: string): number => {
  if (!portion) {
    return 1.0;
  }

  const parsedPortion = Number(portion);
  return Number.isFinite(parsedPortion) ? parsedPortion : 1.0;
};

export default function FoodItemDetailScreen() {
  const router = useRouter();
  const {
    id,
    name,
    portion: portionProp,
    unit: unitProp,
    gramsPerServing: gramsPerServingStr,
    calories: caloriesStr,
    totalFat: totalFatStr,
    totalCarb: totalCarbStr,
    protein: proteinStr,
  } = useLocalSearchParams<{
    id: string;
    name: string;
    portion: string;
    unit: string;
    gramsPerServing: string;
    calories: string;
    totalFat: string;
    totalCarb: string;
    protein: string;
  }>();
  const [unit, setUnit] = useState<"grams" | "servings">(() =>
    getInitialUnit(unitProp),
  );
  const [portion, setPortion] = useState(() => getInitialPortion(portionProp));
  const [foodItem, setFoodItem] = useState<FoodItem>({
    id: "",
    name: "",
    gramsPerServing: 0,
    calories: 0,
    totalFat: 0,
    totalCarb: 0,
    protein: 0,
  });

  useEffect(() => {
    if (
      id &&
      name &&
      gramsPerServingStr &&
      caloriesStr &&
      totalFatStr &&
      totalCarbStr &&
      proteinStr
    ) {
      setFoodItem({
        id,
        name,
        gramsPerServing: Number(gramsPerServingStr),
        calories: Number(caloriesStr),
        totalFat: Number(totalFatStr),
        totalCarb: Number(totalCarbStr),
        protein: Number(proteinStr),
      });
    }
  }, [
    id,
    name,
    gramsPerServingStr,
    caloriesStr,
    totalFatStr,
    totalCarbStr,
    proteinStr,
  ]);

  useEffect(() => {
    setUnit(getInitialUnit(unitProp));
    setPortion(getInitialPortion(portionProp));
  }, [portionProp, unitProp]);

  const onSave = () => {
    router.dismissTo({
      pathname: "/foodItemPage",
      params: {
        savedItemId: id,
        saved: "true",
        portion: portion.toString(),
        unit,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.saveButtonContainer} onPress={onSave}>
        <View style={styles.saveButton}>
          <Text>儲存</Text>
        </View>
      </TouchableOpacity>
      <PortionBox
        unit={unit}
        handleUnitChange={setUnit}
        portion={portion}
        handlePortionChange={setPortion}
        gramsPerServing={foodItem.gramsPerServing}
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
    alignItems: "center",
  },
  saveButtonContainer: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#c2c2c2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

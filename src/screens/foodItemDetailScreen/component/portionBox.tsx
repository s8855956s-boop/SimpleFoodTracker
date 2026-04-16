import StarButton from "@/component/starButton";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type PortionBoxProps = {
  unit: "grams" | "servings";
  handleUnitChange: (newUnit: "grams" | "servings") => void;
  portion?: number;
  gramsPerServing: number;
  foodTitle: string;
  calories: number;
  totalCarb: number;
  totalFat: number;
  protein: number;
  isFavourite?: boolean;
};

export default function PortionBox(props: PortionBoxProps) {
  const [portion, setPortion] = useState(
    props.portion
      ? props.portion
      : props.unit === "servings"
        ? 1.0
        : props.gramsPerServing,
  );
  const [previousValue, setPreviousValue] = useState(1.0);
  const [portionInputValue, setPortionInputValue] = useState("1.0");
  const unit = props.unit;

  useEffect(() => {
    if (unit === "servings") {
      setPortion(1.0);
      setPortionInputValue("1.0");
    } else if (unit === "grams") {
      setPortion(100.0);
      setPortionInputValue("100.0");
    }
  }, [unit]);

  const [isFavourite, setIsFavourite] = useState(
    props.isFavourite ? props.isFavourite : false,
  );

  const handleFocus = () => {
    setPreviousValue(portion);
    setPortionInputValue("");
  };

  const handleBlur = () => {
    if (portionInputValue === "") {
      setPortion(previousValue);
      setPortionInputValue(previousValue.toFixed(1));
      return;
    }

    const num = Number(portionInputValue);
    if (Number.isNaN(num)) {
      setPortion(previousValue);
      setPortionInputValue(previousValue.toFixed(1));
      return;
    }

    setPortion(num);
    setPortionInputValue(num.toFixed(1));
  };

  const handleChange = (text: string) => {
    if (/^\d*(\.\d?)?$/.test(text)) {
      setPortionInputValue(text);
    }
  };

  const addToFavourite = () => {
    if (isFavourite) {
      setIsFavourite(false);
    } else {
      setIsFavourite(true);
    }
  };

  const formatNutritionValue = (value: number) => {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  };

  const calculateNutrition = (value: number) => {
    if (unit === "servings") {
      return value * portion;
    } else if (unit === "grams") {
      return (value / props.gramsPerServing) * portion;
    }
    return 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.foodTitle}>{props.foodTitle}</Text>
          <Text style={styles.calories}>{props.calories} Calories</Text>
        </View>
        <StarButton onPress={addToFavourite} size={30} filled={isFavourite} />
      </View>
      <TextInput
        style={styles.portionInput}
        onFocus={handleFocus}
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={portionInputValue}
        keyboardType="decimal-pad"
        inputMode="numeric"
      />
      <Picker
        style={styles.picker}
        selectedValue={unit}
        onValueChange={(itemValue) => props.handleUnitChange(itemValue)}
      >
        <Picker.Item label="份" value="servings" />
        <Picker.Item label="公克" value="grams" />
      </Picker>
      <Text>
        熱量: {formatNutritionValue(calculateNutrition(props.calories))} 克,
        碳水化合物: {formatNutritionValue(calculateNutrition(props.totalCarb))}{" "}
        克, 蛋白質: {formatNutritionValue(calculateNutrition(props.protein))}{" "}
        克, 脂肪: {formatNutritionValue(calculateNutrition(props.totalFat))} 克
      </Text>
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
    alignItems: "center",
  },
  picker: {
    width: "40%",
  },
  portionInput: {
    width: 50,
    height: 40,
    borderColor: "#535456",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "column",
  },
  foodTitle: {
    fontSize: 24,
  },
  calories: {
    color: "#9f9e9e",
  },
});

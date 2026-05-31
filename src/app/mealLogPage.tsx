import MealLogPageScreen from "@/screens/mealLogPageScreen/indes";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function MealLogPage() {
  const {
    ids,
    portion: portionProp,
    unit: unitProp,
  } = useLocalSearchParams<{
    ids: string[];
    portion: string;
    unit: string;
  }>();

  return (
    <View>
      <MealLogPageScreen />
    </View>
  );
}

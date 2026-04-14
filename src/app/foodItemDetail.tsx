import FoodItemDetailScreen from "@/screens/foodItemDetailScreen";
import { View } from "react-native";

export default function FoodItemDetail() {
  return (
    <View
      style={{
        backgroundColor: "#e4e4e4",
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FoodItemDetailScreen />
    </View>
  );
}

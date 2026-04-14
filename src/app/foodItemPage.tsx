import FoodItemPageScreen from "@/screens/foodItemPageScreen";
import { View } from "react-native";

export default function FoodItemPage() {
  return (
    <View
      style={{
        backgroundColor: "#e4e4e4",
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FoodItemPageScreen
        foodItems={[
          {
            title: "備餐",
            calories: 770,
            servings: 1,
            selected: true,
            category: "favorite",
          },
          {
            title: "備餐2",
            calories: 880,
            servings: 1,
            selected: false,
            category: "myFood",
          },
        ]}
      />
    </View>
  );
}

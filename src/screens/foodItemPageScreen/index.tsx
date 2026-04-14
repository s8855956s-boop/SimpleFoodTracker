import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FoodItem from "./components/foodItem";

type FoodItemObj = {
  title: string;
  calories: number;
  servings: number;
  selected?: boolean;
  category: "favorite" | "myFood";
};

type FoodItemPageProps = {
  foodItems?: FoodItemObj[];
};

export default function FoodItemPageScreen(props: FoodItemPageProps) {
  const [chosenTag, setChosenTag] = useState("favorite");

  const [foodItems, setFoodItems] = useState<FoodItemObj[]>(
    props.foodItems ?? [],
  );

  const toggleItem = (index: number) => {
    setFoodItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const visibleItems =
    chosenTag === "favorite"
      ? foodItems.filter((item) => item.category === chosenTag)
      : foodItems;

  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>
        <TouchableOpacity onPress={() => setChosenTag("favorite")}>
          <View
            style={[styles.tag, chosenTag === "favorite" && styles.activeTag]}
          >
            <Text
              style={[
                styles.tagText,
                chosenTag === "favorite" && styles.activeTagText,
              ]}
            >
              我的最愛
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setChosenTag("myFood")}>
          <View
            style={[styles.tag, chosenTag === "myFood" && styles.activeTag]}
          >
            <Text
              style={[
                styles.tagText,
                chosenTag === "myFood" && styles.activeTagText,
              ]}
            >
              我的食物
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.foodItemContainer}>
        {visibleItems?.map((item, index) => (
          <FoodItem
            key={index}
            title={item.title}
            details={`${item.calories * item.servings}大卡、${item.servings || 0}份量`}
            selected={item.selected ?? false}
            onToggle={() => toggleItem(index)}
          />
        ))}
        {!visibleItems?.length && (
          <Text style={{ textAlign: "center", color: "#6b7280" }}>
            目前沒有食物紀錄，請先新增食物
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    width: "90%",
  },
  foodItemContainer: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    marginTop: "5%",
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tag: {
    backgroundColor: "#c7c7c9",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    color: "#000",
  },
  activeTag: {
    backgroundColor: "#161717",
  },
  activeTagText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

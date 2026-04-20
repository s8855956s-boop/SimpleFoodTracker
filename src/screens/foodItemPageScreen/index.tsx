import { FoodItem } from "@/type/type";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FoodItemPage from "./components/foodItemPage";

type FoodItemPageProps = {
  foodItems: FoodItem[];
};

export default function FoodItemPageScreen(props: FoodItemPageProps) {
  const [chosenTag, setChosenTag] = useState("favorite");
  const [toggleItemIds, setToggleItemIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setToggleItemIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const visibleItems =
    chosenTag === "favorite"
      ? props.foodItems.filter((item) => item.category === chosenTag)
      : props.foodItems;

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/foodItemEdit")}
        >
          <Text style={styles.addButtonText}>新增食物 +</Text>
        </TouchableOpacity>
      </View>
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
          <FoodItemPage
            key={index}
            id={item.id}
            name={item.name}
            calories={item.calories}
            gramsPerServing={item.gramsPerServing}
            totalCarb={item.totalCarb}
            totalFat={item.totalFat}
            protein={item.protein}
            selected={toggleItemIds.includes(item.id)}
            onToggle={() => toggleItem(item.id)}
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
    marginTop: "5%",
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
  addButton: {
    height: 36,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
    marginLeft: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 22,
  },
});

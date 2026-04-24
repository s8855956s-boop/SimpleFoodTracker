import { FoodItem } from "@/type/type";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FoodItemPage from "./components/foodItemPage";

type FoodItemPageProps = {
  foodItems: FoodItem[];
};

export default function FoodItemPageScreen(props: FoodItemPageProps) {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const [chosenTag, setChosenTag] = useState("favorite");
  const [toggleItemIds, setToggleItemIds] = useState<string[]>([]);
  const [portion, setPortion] = useState<number[]>([1]);
  const [unit, setUnit] = useState<("grams" | "servings")[]>(["servings"]);
  const handledSaveKeyRef = useRef<string | null>(null);
  const {
    saved,
    savedItemId,
    portion: savedPortion,
    unit: savedUnit,
  } = useLocalSearchParams<{
    saved?: string;
    savedItemId?: string;
    portion?: string;
    unit?: "grams" | "servings";
  }>();

  const handlePortionChange = useCallback(
    (index: number, newPortion: number) => {
      setPortion((prev) => {
        const updatedPortions = [...prev];
        updatedPortions[index] = newPortion;
        return updatedPortions;
      });
    },
    [],
  );

  const handleUnitChange = useCallback(
    (index: number, newUnit: "grams" | "servings") => {
      setUnit((prev) => {
        const updatedUnits = [...prev];
        updatedUnits[index] = newUnit;
        return updatedUnits;
      });
    },
    [],
  );

  const toggleItem = useCallback(
    (id: string, index: number) => {
      setToggleItemIds((prev) => {
        if (prev.includes(id)) {
          handlePortionChange(index, 1);
          handleUnitChange(index, "servings");
          return prev.filter((itemId) => itemId !== id);
        } else {
          return [...prev, id];
        }
      });
    },
    [handlePortionChange, handleUnitChange],
  );

  const visibleItems = useMemo(
    () =>
      chosenTag === "favorite"
        ? props.foodItems.filter((item) => item.category === chosenTag)
        : props.foodItems,
    [chosenTag, props.foodItems],
  );
  const hasVisibleItems = visibleItems.length > 0;

  const router = useRouter();
  const foodItemContainerMaxHeight = Math.max(
    120,
    windowHeight - insets.top - insets.bottom - 230,
  );

  useEffect(() => {
    if (saved !== "true" || !savedItemId) {
      return;
    }

    const saveKey = `${savedItemId}:${savedPortion ?? ""}:${savedUnit ?? ""}`;
    if (handledSaveKeyRef.current === saveKey) {
      return;
    }

    const savedItemIndex = visibleItems.findIndex(
      (item) => item.id === savedItemId,
    );
    if (savedItemIndex === -1) {
      return;
    }

    handledSaveKeyRef.current = saveKey;
    setToggleItemIds((prev) =>
      prev.includes(savedItemId) ? prev : [...prev, savedItemId],
    );

    if (savedPortion) {
      handlePortionChange(savedItemIndex, Number(savedPortion));
    }
    if (savedUnit) {
      handleUnitChange(savedItemIndex, savedUnit);
    }
  }, [
    saved,
    savedItemId,
    savedPortion,
    savedUnit,
    visibleItems,
    handlePortionChange,
    handleUnitChange,
  ]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 16,
        },
        hasVisibleItems && styles.containerFilled,
      ]}
    >
      <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/foodItemEdit")}
        >
          <Text style={styles.addButtonText}>新增食物 +</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <View style={styles.foodItemTag}>
          <Text>備餐</Text>
          <TouchableOpacity
            style={styles.removeTagButton}
            onPress={() => console.log("remove food item")}
          >
            <Text style={styles.removeTagButtonText}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.foodItemTag}>
          <Text>備餐2</Text>
          <TouchableOpacity
            style={styles.removeTagButton}
            onPress={() => console.log("remove food item")}
          >
            <Text style={styles.removeTagButtonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.foodItemTag}>
          <Text>備餐3</Text>
          <TouchableOpacity
            style={styles.removeTagButton}
            onPress={() => console.log("remove food item")}
          >
            <Text style={styles.removeTagButtonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.foodItemTag}>
          <Text>備餐4</Text>
          <TouchableOpacity
            style={styles.removeTagButton}
            onPress={() => console.log("remove food item")}
          >
            <Text style={styles.removeTagButtonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.foodItemTag}>
          <Text>備餐5</Text>
          <TouchableOpacity
            style={styles.removeTagButton}
            onPress={() => console.log("remove food item")}
          >
            <Text style={styles.removeTagButtonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.foodItemTag}>
          <Text>備餐6</Text>
          <TouchableOpacity
            style={styles.removeTagButton}
            onPress={() => console.log("remove food item")}
          >
            <Text style={styles.removeTagButtonText}>-</Text>
          </TouchableOpacity>
        </View>
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
      <ScrollView
        style={[
          styles.foodItemContainer,
          { maxHeight: foodItemContainerMaxHeight },
        ]}
        contentContainerStyle={styles.foodItemContent}
      >
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
            onToggle={() => toggleItem(item.id, index)}
            portion={portion[index] || 1}
            unit={unit[index] || "servings"}
            handlePortionChange={(newPortion) =>
              handlePortionChange(index, newPortion)
            }
            handleUnitChange={(newUnit) => handleUnitChange(index, newUnit)}
          />
        ))}
        {!hasVisibleItems && (
          <Text style={{ textAlign: "center", color: "#6b7280" }}>
            目前沒有食物紀錄，請先新增食物
          </Text>
        )}
      </ScrollView>
      {toggleItemIds.length > 0 && (
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.addButtonText}>下一筆</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    width: "90%",
  },
  containerFilled: {
    flex: 1,
  },
  foodItemContainer: {
    flexGrow: 0,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: "5%",
  },
  foodItemContent: {
    padding: 10,
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
  nextButton: {
    height: 36,
    paddingHorizontal: 15,
    width: "45%",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
    marginTop: 10,
  },
  foodItemTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#c7c7c9",
  },
  removeTagButton: {
    borderRadius: 12.5,
    alignItems: "center",
    justifyContent: "center",
    height: 15,
    width: 15,
    backgroundColor: "#e9e9e9",
    marginLeft: 5,
  },
  removeTagButtonText: {
    color: "#ea0c17",
    fontWeight: "bold",
    textAlign: "center",
  },
});

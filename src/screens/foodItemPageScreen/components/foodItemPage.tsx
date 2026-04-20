import { FoodItem } from "@/type/type";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type FoodItemPageProps = FoodItem & {
  selected?: boolean;
  onToggle?: () => void;
  portion?: number;
  unit?: "grams" | "servings";
};

export default function FoodItemPage(props: FoodItemPageProps) {
  const router = useRouter();
  const [portion, setPortion] = useState(1);
  const [unit, setUnit] = useState<"grams" | "servings">("servings");

  useEffect(() => {
    if (props.portion) {
      setPortion(props.portion);
    }
    if (props.unit) {
      setUnit(props.unit);
    }
  }, [props.portion, props.unit]);

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.checkbox, props.selected && styles.checkboxChecked]}
        onPress={() => {
          props.onToggle?.();
        }}
      >
        {props.selected && (
          <View style={styles.checkboxInner}>
            <Text>✓</Text>
          </View>
        )}
      </Pressable>
      <View style={styles.separator} />
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => {
          router.push({
            pathname: "/foodItemDetail",
            params: {
              id: props.id,
              name: props.name,
              gramsPerServing: String(props.gramsPerServing),
              calories: String(props.calories),
              totalFat: String(props.totalFat),
              totalCarb: String(props.totalCarb),
              protein: String(props.protein),
            },
          });
        }}
      >
        <Text>{props.name}</Text>
        <Text style={styles.subTitle}>
          {props.calories * portion}大卡{" "}
          {unit && `${portion} ${unit === "grams" ? "克" : "份"}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 2,
    borderColor: "#9ca3af",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    borderColor: "#7a7a7a",
  },
  checkboxInner: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "#7a7a7a",
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "#e4e4e4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
  },
  subTitle: {
    color: "#6b7280",
    fontSize: 12,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  separator: {
    width: 1,
    height: "80%",
    backgroundColor: "#848484",
    marginHorizontal: 10,
  },
});

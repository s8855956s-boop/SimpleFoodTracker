import { useRouter } from "expo-router";
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type FoodItemProps = {
  title: string;
  totalCalories?: number;
  details?: string;
  selected?: boolean;
  onToggle?: () => void;
};

export default function FoodItem(props: FoodItemProps) {
  const router = useRouter();

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
        onPress={() => router.push("/foodItemDetail")}
      >
        <Text>{props.title}</Text>
        {props.details && <Text style={styles.subTitle}>{props.details}</Text>}
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

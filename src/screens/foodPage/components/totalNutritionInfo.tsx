import { StyleSheet, Text, View } from "react-native";

type TotalNutritionInfoProps = {
  totalCarb: number;
  totalFat: number;
  protein: number;
};

export default function TotalNutritionInfo(props: TotalNutritionInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.macro}>
        <Text style={{ color: "#028a0b" }}>碳水化合物</Text>
        <Text style={styles.macroText}>{props.totalCarb} 克</Text>
      </View>
      <View style={styles.macro}>
        <Text style={{ color: "#d54000" }}>脂肪</Text>
        <Text style={styles.macroText}>{props.totalFat} 克</Text>
      </View>
      <View style={styles.macro}>
        <Text style={{ color: "#2000d5" }}>蛋白質</Text>
        <Text style={styles.macroText}>{props.protein} 克</Text>
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  macro: {
    flexDirection: "column",
    alignItems: "center",
  },
  macroText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#848484",
    marginVertical: 4,
  },
});

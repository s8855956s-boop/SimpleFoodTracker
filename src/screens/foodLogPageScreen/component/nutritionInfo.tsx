import { StyleSheet, Text, View } from "react-native";

export default function NutritionInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.caloriesText}>總熱量: 1500 大卡</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>蛋白質: 100g</Text>
        <Text style={styles.summaryText}>碳水化合物: 200g</Text>
        <Text style={styles.summaryText}>脂肪: 50g</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: "10%",
    width: "90%",
    alignItems: "baseline",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  caloriesText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  summaryText: {
    fontSize: 16,
  },
});

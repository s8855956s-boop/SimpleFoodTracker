import { StyleSheet, Text, View } from "react-native";

type NutritionFactsProps = {
  calories: number;
  totalFat: number;
  totalCarb: number;
  protein: number;
};

export default function NutritionFactsBox(props: NutritionFactsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.nutritionTag}>
        <View style={styles.nutritionRow}>
          <Text>分量大小</Text>
          <Text>1 份量</Text>
        </View>
        <View style={styles.primarySeparator}></View>
        <View style={styles.nutritionRow}>
          <Text>卡路里</Text>
          <Text>{props.calories}</Text>
        </View>
        <View style={styles.secondarySeparator}></View>
        <View style={styles.nutritionRow}>
          <Text>總脂肪 {props.totalFat} 克</Text>
        </View>
        <View style={styles.minorSeparator}></View>
        <View style={styles.nutritionRow}>
          <Text>總碳水化合物 {props.totalCarb} 克</Text>
        </View>
        <View style={styles.minorSeparator}></View>
        <View style={styles.nutritionRow}>
          <Text>蛋白質 {props.protein} 克</Text>
        </View>
        <View style={styles.minorSeparator}></View>
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
    alignItems: "center",
  },
  nutritionTag: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    flexDirection: "column",
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primarySeparator: {
    height: 5,
    backgroundColor: "#000000",
    marginVertical: 4,
  },
  secondarySeparator: {
    height: 3,
    backgroundColor: "#000000",
    marginVertical: 4,
  },
  minorSeparator: {
    height: 1,
    backgroundColor: "#000000",
    marginVertical: 4,
  },
});

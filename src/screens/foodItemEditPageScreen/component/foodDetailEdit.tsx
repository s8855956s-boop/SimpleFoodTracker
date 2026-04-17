import { drizzle } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function FoodDetailEdit() {
  const sqlite = useSQLiteContext();
  const drizzleDb = drizzle(sqlite);
  const router = useRouter();

  const [name, setName] = useState("");
  const [gramsPerServing, setGramsPerServing] = useState("");
  const [calories, setCalories] = useState("");
  const [totalFat, setTotalFat] = useState("");
  const [totalCarb, setTotalCarb] = useState("");
  const [protein, setProtein] = useState("");

  const handleSave = () => {
    // if (
    //   !name.trim() ||
    //   !gramsPerServing.trim() ||
    //   !calories.trim() ||
    //   !totalFat.trim() ||
    //   !totalCarb.trim() ||
    //   !protein.trim()
    // ) {
    //   Alert.alert("提醒", "請填完所有必填欄位");
    //   return;
    // }
    // try {
    //   drizzleDb
    //     .insert(food_item)
    //     .values({
    //       name: name.trim(),
    //       grams_per_serving: Number(gramsPerServing),
    //       calories: Number(calories),
    //       total_fat: Number(totalFat),
    //       total_carb: Number(totalCarb),
    //       protein: Number(protein),
    //     })
    //     .run();
    //   Alert.alert("成功", "食物資料已新增");
    //   router.back();
    //   setName("");
    //   setGramsPerServing("");
    //   setCalories("");
    //   setTotalFat("");
    //   setTotalCarb("");
    //   setProtein("");
    // } catch (error) {
    //   console.error(error);
    //   Alert.alert("錯誤", "寫入資料庫失敗");
    // }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="食物名稱"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.row}>
        <Text>熱量</Text>
        <TextInput
          style={styles.numberInput}
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
        <Text>每份克數</Text>
        <TextInput
          style={styles.numberInput}
          value={gramsPerServing}
          onChangeText={setGramsPerServing}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
        <Text>蛋白質</Text>
        <TextInput
          style={styles.numberInput}
          value={protein}
          onChangeText={setProtein}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
        <Text>脂肪</Text>
        <TextInput
          style={styles.numberInput}
          value={totalFat}
          onChangeText={setTotalFat}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
        <Text>碳水</Text>
        <TextInput
          style={styles.numberInput}
          value={totalCarb}
          onChangeText={setTotalCarb}
          keyboardType="numeric"
        />
      </View>

      <View style={{ height: 20 }} />
      <Button title="儲存" onPress={handleSave} />
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
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 6,
  },
  numberInput: {
    width: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 6,
    textAlign: "right",
  },
});

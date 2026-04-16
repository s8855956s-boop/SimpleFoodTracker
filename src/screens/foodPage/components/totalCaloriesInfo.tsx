import { StyleSheet, Text, View } from "react-native";

type TotalCaloriesInfoProps = {
  calories: number;
};

export default function TotalCaloriesInfo(props: TotalCaloriesInfoProps) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "baseline" }}>
        <Text style={{ fontSize: 32, fontWeight: "bold", marginRight: 4 }}>
          {props.calories}
        </Text>
        <Text>大卡</Text>
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
  separator: {
    height: 1,
    backgroundColor: "#848484",
    marginVertical: 4,
  },
});

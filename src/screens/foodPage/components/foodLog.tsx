import { StyleSheet, Text, View } from "react-native";

type FoodLogProps = {
  title: string;
};

export default function FoodLog(props: FoodLogProps) {
  return (
    <View style={style.container}>
      <View style={style.circle}>
        <Text>0</Text>
        <Text>大卡</Text>
      </View>
      <View>
        <Text style={style.titleContainer}>{props.title}</Text>
      </View>
      <Text style={style.addButton}>+</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#e4e4e4",
    borderRadius: "50%",
    height: 55,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginRight: 10,
  },
  titleContainer: {
    width: 250,
  },
  addButton: {
    fontSize: 30,
  },
});

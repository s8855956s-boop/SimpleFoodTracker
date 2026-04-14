import { StyleSheet, View } from "react-native";
import PortionBox from "./component/portionBox";

export default function FoodItemDetailScreen() {
  return (
    <View style={styles.container}>
      <PortionBox foodTitle="備餐" calories={800} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    marginTop: "10%",
    width: "90%",
  },
});

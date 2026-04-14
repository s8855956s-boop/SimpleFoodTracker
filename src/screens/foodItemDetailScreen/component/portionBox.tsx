import StarButton from "@/component/starButton";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type PortionBoxProps = {
  foodTitle: string;
  calories: number;
  isFavourite?: boolean;
};

export default function PortionBox(props: PortionBoxProps) {
  const [portion, setPortion] = useState("1.0");
  const [previousValue, setPreviousValue] = useState("1.0");

  const [isFavourite, setIsFavourite] = useState(
    props.isFavourite ? props.isFavourite : false,
  );

  const handleFocus = () => {
    setPreviousValue(portion);
    setPortion("");
  };

  const handleBlur = () => {
    if (portion === "") {
      setPortion(previousValue);
      return;
    }

    const num = Number(portion);
    if (Number.isNaN(num)) {
      setPortion(previousValue);
      return;
    }

    const formatted = num.toFixed(1);
    setPortion(formatted);
  };

  const handleChange = (text: string) => {
    if (/^\d{0,2}(\.\d?)?$/.test(text)) {
      setPortion(text);
    }
  };

  const addToFavourite = () => {
    if (isFavourite) {
      setIsFavourite(false);
    } else {
      setIsFavourite(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.foodTitle}>{props.foodTitle}</Text>
          <Text style={styles.calories}>{props.calories} 大卡</Text>
        </View>
        <StarButton onPress={addToFavourite} size={30} filled={isFavourite} />
      </View>
      <TextInput
        style={styles.portionInput}
        onFocus={handleFocus}
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={portion}
        keyboardType="decimal-pad" // Opens the numeric keyboard
        inputMode="numeric" // Newer prop with higher precedence
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
  },
  portionInput: {
    width: 50,
    height: 40,
    borderColor: "#535456",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "column",
  },
  foodTitle: {
    fontSize: 24,
  },
  calories: {
    color: "#9f9e9e",
  },
});

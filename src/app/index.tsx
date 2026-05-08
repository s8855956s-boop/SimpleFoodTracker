import { getFoodLogsByDate } from "@/db/db";
import FoodPage from "@/screens/foodPage";
import { FoodLog } from "@/type/type";
import { useEffect, useState } from "react";
import { View } from "react-native";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Index() {
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [date, setDate] = useState(() => formatDate(new Date()));

  useEffect(() => {
    async function loadFoodLogs() {
      const today = formatDate(new Date());
      setDate(today);

      try {
        const logs = await getFoodLogsByDate(today);
        setFoodLogs(logs);
      } catch (error) {
        console.error("Error loading today's food logs", error);
      }
    }

    loadFoodLogs();
  }, []);

  return (
    <View>
      <FoodPage date={date} foodLogs={foodLogs} />
    </View>
  );
}

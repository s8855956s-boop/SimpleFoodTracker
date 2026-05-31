import { FoodLog } from "@/type/type";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FoodLogsContainer from "./components/foodLogsContainer";
import TotalCaloriesInfo from "./components/totalCaloriesInfo";
import TotalNutritionInfo from "./components/totalNutritionInfo";

const isSameDate = (dateA: Date, dateB: Date) =>
  dateA.getFullYear() === dateB.getFullYear() &&
  dateA.getMonth() === dateB.getMonth() &&
  dateA.getDate() === dateB.getDate();

const formatDateTitle = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const getWeekDates = (date: Date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  return Array.from({ length: 7 }, (_, index) => {
    const weekDate = new Date(startOfWeek);
    weekDate.setDate(startOfWeek.getDate() + index);
    return weekDate;
  });
};

export default function FoodPage() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const foodLogs: FoodLog[] = [
    {
      id: 1,
      date: new Date("2026-06-01"),
      title: "breakfast",
      totalCalories: 500,
      foodItems: [
        {
          id: "1",
          name: "Egg sandwich",
          unit: "servings",
          amount: 1,
          gramsPerServing: 180,
          caloriesPerServing: 300,
          fatPerServing: 10,
          carbPerServing: 30,
          proteinPerServing: 15,
          totalCalories: 300,
          totalCarb: 30,
          totalFat: 10,
          protein: 15,
        },
        {
          id: "2",
          name: "Chicken breast",
          unit: "grams",
          amount: 200,
          gramsPerServing: 200,
          caloriesPerServing: 200,
          fatPerServing: 8,
          carbPerServing: 20,
          proteinPerServing: 10,
          totalCalories: 200,
          totalCarb: 20,
          totalFat: 8,
          protein: 10,
        },
      ],
    },
    {
      id: 2,
      date: new Date("2026-06-01"),
      title: "lunch",
      totalCalories: 700,
      foodItems: [
        {
          id: "3",
          name: "Rice bowl",
          unit: "grams",
          amount: 300,
          gramsPerServing: 300,
          caloriesPerServing: 700,
          fatPerServing: 20,
          carbPerServing: 70,
          proteinPerServing: 30,
          totalCalories: 700,
          totalCarb: 70,
          totalFat: 20,
          protein: 30,
        },
      ],
    },
    {
      id: 3,
      date: new Date("2026-06-01"),
      title: "dinner",
      totalCalories: 650,
      foodItems: [
        {
          id: "4",
          name: "Grilled salmon",
          unit: "grams",
          amount: 250,
          gramsPerServing: 250,
          caloriesPerServing: 400,
          fatPerServing: 12,
          carbPerServing: 18,
          proteinPerServing: 42,
          totalCalories: 400,
          totalCarb: 18,
          totalFat: 12,
          protein: 42,
        },
        {
          id: "5",
          name: "Sweet potato",
          unit: "grams",
          amount: 150,
          gramsPerServing: 150,
          caloriesPerServing: 250,
          fatPerServing: 1,
          carbPerServing: 45,
          proteinPerServing: 4,
          totalCalories: 250,
          totalCarb: 45,
          totalFat: 1,
          protein: 4,
        },
      ],
    },
    {
      id: 4,
      date: new Date("2026-06-01"),
      title: "snack",
      totalCalories: 180,
      foodItems: [
        {
          id: "6",
          name: "Apple",
          unit: "servings",
          amount: 1,
          gramsPerServing: 120,
          caloriesPerServing: 90,
          fatPerServing: 0,
          carbPerServing: 23,
          proteinPerServing: 1,
          totalCalories: 90,
          totalCarb: 23,
          totalFat: 0,
          protein: 1,
        },
        {
          id: "7",
          name: "Greek yogurt",
          unit: "grams",
          amount: 100,
          gramsPerServing: 100,
          caloriesPerServing: 90,
          fatPerServing: 3,
          carbPerServing: 6,
          proteinPerServing: 8,
          totalCalories: 90,
          totalCarb: 6,
          totalFat: 3,
          protein: 8,
        },
      ],
    },
  ];

  const selectedFoodLogs = foodLogs.filter((log) =>
    isSameDate(log.date, selectedDate),
  );

  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);

  const totalCalories = selectedFoodLogs.reduce(
    (sum, log) => sum + log.totalCalories,
    0,
  );

  const changeWeek = (weekOffset: number) => {
    setSelectedDate((currentDate) => {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + weekOffset * 7);
      return nextDate;
    });
  };
  
  const containerMaxHeight = Math.max(
    120,
    windowHeight - insets.top - insets.bottom - 85,
  );

  return (
    <ScrollView style={{ maxHeight: containerMaxHeight }}
    contentContainerStyle={styles.container}>
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            accessibilityLabel="Previous week"
            style={styles.calendarNavButton}
            onPress={() => changeWeek(-1)}
          >
            <Ionicons name="chevron-back" size={20} color="#111827" />
          </TouchableOpacity>
          <View style={styles.calendarTitleContainer}>
            <Ionicons name="calendar-outline" size={18} color="#6b7280" />
            <Text style={styles.calendarTitle}>
              {formatDateTitle(selectedDate)}
            </Text>
          </View>
          <TouchableOpacity
            accessibilityLabel="Next week"
            style={styles.calendarNavButton}
            onPress={() => changeWeek(1)}
          >
            <Ionicons name="chevron-forward" size={20} color="#111827" />
          </TouchableOpacity>
        </View>
        <View style={styles.weekContainer}>
          {weekDates.map((date) => {
            const selected = isSameDate(date, selectedDate);

            return (
              <TouchableOpacity
                key={date.toISOString()}
                style={[
                  styles.dayButton,
                  selected && styles.selectedDayButton,
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text
                  style={[styles.weekdayText, selected && styles.selectedText]}
                >
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </Text>
                <Text style={[styles.dayText, selected && styles.selectedText]}>
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <TotalCaloriesInfo calories={totalCalories} />
      <TotalNutritionInfo
        totalCarb={selectedFoodLogs.reduce(
          (sum, log) =>
            sum +
            log.foodItems.reduce(
              (itemSum, item) => itemSum + item.totalCarb,
              0,
            ),
          0,
        )}
        totalFat={selectedFoodLogs.reduce(
          (sum, log) =>
            sum +
            log.foodItems.reduce((itemSum, item) => itemSum + item.totalFat, 0),
          0,
        )}
        protein={selectedFoodLogs.reduce(
          (sum, log) =>
            sum +
            log.foodItems.reduce((itemSum, item) => itemSum + item.protein, 0),
          0,
        )}
      />
      <FoodLogsContainer foodLogs={selectedFoodLogs} date={selectedDate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  calendarContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 16,
    padding: 12,
    width: "90%",
  },
  calendarHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  calendarNavButton: {
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  calendarTitleContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  calendarTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayButton: {
    alignItems: "center",
    borderRadius: 8,
    minHeight: 58,
    paddingVertical: 8,
    width: 42,
  },
  selectedDayButton: {
    backgroundColor: "#111827",
  },
  weekdayText: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "600",
  },
  dayText: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
  selectedText: {
    color: "#fff",
  },
  separator: {
    height: 1,
    backgroundColor: "#848484",
    marginVertical: 4,
  },
});

export type FoodItem = {
  id: string;
  name: string;
  gramsPerServing: number;
  calories: number;
  totalFat: number;
  totalCarb: number;
  protein: number;
  category?: "favorite" | "myFood";
};

export type FoodLogItem = {
  id: string;
  name: string;
  unit: "grams" | "servings";
  amount: number;
  calories: number;
  totalFat: number;
  totalCarb: number;
  protein: number;
};

export type FoodLog = {
  id: number;
  title: "breakfast" | "lunch" | "dinner" | "snack";
  date: Date;
  totalCalories: number;
  foodItems: FoodLogItem[];
};

export type FoodItem = {
  name: string;
  gramsPerServing: number;
  calories: number;
  totalFat: number;
  totalCarb: number;
  protein: number;
  category?: "favorite" | "myFood";
};

export type FoodLogItem = {
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
  title: string;
  date: Date;
  totalCalories: number;
  foodItems: FoodLogItem[];
};

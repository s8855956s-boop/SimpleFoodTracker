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
  gramsPerServing: number;
  caloriesPerServing: number;
  fatPerServing: number;
  carbPerServing: number;
  proteinPerServing: number;
  totalCalories: number;
  totalFat: number;
  totalCarb: number;
  totalProtein: number;
};

export type FoodLog = {
  id: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  date: Date;
  totalCalories: number;
  foodItems: FoodLogItem[];
};

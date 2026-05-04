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
  portion: number;
  unit: "grams" | "servings";
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
  title: "breakfast" | "lunch" | "dinner" | "snack";
  date: Date;
  totalCalories: number;
  foodItems: FoodLogItem[];
};

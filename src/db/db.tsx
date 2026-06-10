import { FoodItem, FoodLog, FoodLogItem } from "@/type/type";
import * as SQLite from "expo-sqlite";

export const DATABASE_NAME = "food_tracker.db";

export const TABLES = {
  foodItem: "food_item",
  foodLog: "food_log",
  foodLogItem: "food_log_item",
} as const;

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
    initializeDatabase()
  }

  return databasePromise;
}

export async function initializeDatabase() {
  const db = await getDatabase();

  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS ${TABLES.foodItem} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      grams_per_serving REAL NOT NULL,
      calories REAL NOT NULL,
      total_fat REAL NOT NULL,
      total_carb REAL NOT NULL,
      protein REAL NOT NULL,
      category TEXT CHECK (category IN ('favorite', 'myFood') OR category IS NULL)
    );

    CREATE TABLE IF NOT EXISTS ${TABLES.foodLog} (
      id INTEGER PRIMARY KEY,
      meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
      date TEXT NOT NULL UNIQUE,
      total_calories REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ${TABLES.foodLogItem} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      food_log_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      unit TEXT NOT NULL CHECK (unit IN ('grams', 'servings')),
      portion REAL NOT NULL,
      grams_per_serving REAL NOT NULL,
      calories_per_serving REAL NOT NULL,
      fat_per_serving REAL NOT NULL,
      carb_per_serving REAL NOT NULL,
      protein_per_serving REAL NOT NULL,
      total_calories REAL NOT NULL,
      total_fat REAL NOT NULL,
      total_carb REAL NOT NULL,
      protein REAL NOT NULL,
      FOREIGN KEY (food_log_id) REFERENCES ${TABLES.foodLog}(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_food_logs_date
      ON ${TABLES.foodLog}(date);

    CREATE INDEX IF NOT EXISTS idx_food_log_items_food_log_id
      ON ${TABLES.foodLogItem}(food_log_id);
  `);

  return db;
}

export async function saveFoodItem(
  foodItem: Omit<FoodItem, "id"> & { id?: FoodItem["id"] },
) {
  const db = await getDatabase();
  const result = await db.runAsync(
    `INSERT INTO ${TABLES.foodItem} (
      id,
      name,
      grams_per_serving,
      calories,
      total_fat,
      total_carb,
      protein,
      category
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      grams_per_serving = excluded.grams_per_serving,
      calories = excluded.calories,
      total_fat = excluded.total_fat,
      total_carb = excluded.total_carb,
      protein = excluded.protein,
      category = excluded.category`,
    [
      foodItem.id ? Number(foodItem.id) : null,
      foodItem.name,
      foodItem.gramsPerServing,
      foodItem.calories,
      foodItem.totalFat,
      foodItem.totalCarb,
      foodItem.protein,
      foodItem.category || null,
    ],
  );

  return foodItem.id ? Number(foodItem.id) : result.lastInsertRowId;
}

export async function getAllFoodItems(): Promise<FoodItem[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<{
    id: number;
    name: string;
    grams_per_serving: number;
    calories: number;
    total_fat: number;
    total_carb: number;
    protein: number;
    category: FoodItem["category"] | null;
  }>(
    `SELECT
      id,
      name,
      grams_per_serving,
      calories,
      total_fat,
      total_carb,
      protein,
      category
    FROM ${TABLES.foodItem}
    ORDER BY id DESC`,
  );

  return rows.map((row) => ({
    id: String(row.id),
    name: row.name,
    gramsPerServing: row.grams_per_serving,
    calories: row.calories,
    totalFat: row.total_fat,
    totalCarb: row.total_carb,
    protein: row.protein,
    category: row.category ?? undefined,
  }));
}

export async function getFoodLogsByDate(date: string) {
  const db = await getDatabase();
  const foodLogs = await db.getAllAsync<{
    id: number;
    meal_type: string;
    date: string;
    total_calories: number;
  }>(
    `SELECT id, meal_type, date, total_calories FROM ${TABLES.foodLog} WHERE date = ?`,
    [date],
  );

  if (foodLogs.length === 0) {
    return [];
  }

  const foodLogItems = await db.getAllAsync<{
    id: number;
    food_log_id: number;
    name: string;
    unit: string;
    portion: number;
    grams_per_serving: number;
    calories_per_serving: number;
    fat_per_serving: number;
    carb_per_serving: number;
    protein_per_serving: number;
    total_calories: number;
    total_fat: number;
    total_carb: number;
    protein: number;
  }>(
    `SELECT
      id,
      food_log_id,
      name,
      unit,
      portion,
      grams_per_serving,
      calories_per_serving,
      fat_per_serving,
      carb_per_serving,
      protein_per_serving,
      total_calories,
      total_fat,
      total_carb,
      protein
    FROM ${TABLES.foodLogItem}
    WHERE food_log_id IN (${foodLogs.map(() => "?").join(",")})`,
    foodLogs.map((log) => log.id),
  );

  return foodLogs.map((log) => ({
    id: log.id,
    mealType: log.meal_type as FoodLog["mealType"],
    date: new Date(log.date),
    totalCalories: log.total_calories,
    foodItems: foodLogItems
      .filter((item) => item.food_log_id === log.id)
      .map((item) => ({
        id: String(item.id),
        foodLogId: item.food_log_id,
        name: item.name,
        unit: item.unit as FoodLogItem["unit"],
        amount: item.portion,
        gramsPerServing: item.grams_per_serving,
        caloriesPerServing: item.calories_per_serving,
        fatPerServing: item.fat_per_serving,
        carbPerServing: item.carb_per_serving,
        proteinPerServing: item.protein_per_serving,
        totalCalories: item.total_calories,
        totalFat: item.total_fat,
        totalCarb: item.total_carb,
        totalProtein: item.protein,
      })),
  }));
}

//saveFoodLog and saveFoodLogItems are not complete.
export async function saveFoodLog(foodLog: Omit<FoodLog, "id"> & { id?: FoodLog["id"] }) {
  const db = await getDatabase();
  const result = await db.runAsync(
    `INSERT INTO ${TABLES.foodLog} (id, meal_type, date, total_calories)
     VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        meal_type = excluded.meal_type,
        date = excluded.date,
        total_calories = excluded.total_calories`,
    [
      foodLog.id ? Number(foodLog.id) : null,
      foodLog.mealType,
      foodLog.date.toISOString(),
      foodLog.totalCalories,
    ],
  );
}

export async function saveFoodLogItems(foodLogId: number, items: Omit<FoodLogItem, "id" | "foodLogId">[]) {
  const db = await getDatabase();
  await db.runAsync("BEGIN TRANSACTION");
  try {
    await db.runAsync(
      `DELETE FROM ${TABLES.foodLogItem} WHERE food_log_id = ?`,
      [foodLogId],
    );
    for (const item of items) {
      await db.runAsync(
        `INSERT INTO ${TABLES.foodLogItem} (
          food_log_id,
          name,
          unit,
          portion,
          grams_per_serving,
          calories_per_serving,
          fat_per_serving,
          carb_per_serving,
          protein_per_serving,
          total_calories,
          total_fat,
          total_carb,
          protein
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          foodLogId,
          item.name,
          item.unit,
          item.amount,
          item.gramsPerServing,
          item.caloriesPerServing,
          item.fatPerServing,
          item.carbPerServing,
          item.proteinPerServing,
          item.totalCalories,
          item.totalFat,
          item.totalCarb,
          item.totalProtein
        ]
      );
    }
    await db.runAsync("COMMIT");
  } catch (error) {
    await db.runAsync("ROLLBACK");
    throw error;
  }
}

export async function getFoodItemByIds(ids: string[]) {
  if (ids.length === 0) {
    return [];
  }

  const db = await getDatabase();

  const rows = await db.getAllAsync<{
    id: number;
    name: string;
    grams_per_serving: number;
    calories: number;
    total_fat: number;
    total_carb: number;
    protein: number;
    category: FoodItem["category"] | null;
  }>(
    `SELECT
      id,
      name,
      grams_per_serving,
      calories,
      total_fat,
      total_carb,
      protein,
      category
    FROM ${TABLES.foodItem}
    WHERE id IN (${ids.map(() => "?").join(",")})`,
    ids.map(Number),
  );

  return rows.map((row) => ({
    id: String(row.id),
    foodLogId: row.food_log_id,
    name: row.name,
    gramsPerServing: row.grams_per_serving,
    calories: row.calories,
    totalFat: row.total_fat,
    totalCarb: row.total_carb,
    protein: row.protein,
    category: row.category ?? undefined,
  }));
}

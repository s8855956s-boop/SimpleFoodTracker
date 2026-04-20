import { FoodItem } from "@/type/type";
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
      title TEXT NOT NULL CHECK (title IN ('breakfast', 'lunch', 'dinner', 'snack')),
      date TEXT NOT NULL UNIQUE,
      total_calories REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ${TABLES.foodLogItem} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      food_log_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      unit TEXT NOT NULL CHECK (unit IN ('grams', 'servings')),
      amount REAL NOT NULL,
      calories REAL NOT NULL,
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

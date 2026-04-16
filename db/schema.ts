import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const food_item = sqliteTable("food_item", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  grams_per_serving: integer("grams_per_serving").notNull(),
  calories: integer("calories").notNull(),
  total_fat: integer("total_fat").notNull(),
  total_carb: integer("total_carb").notNull(),
  protein: integer("protein").notNull(),
  category: text("category"),
});

export const food_log = sqliteTable("food_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull().unique(),
  title: text("title").notNull(),
  total_calories: integer("total_calories").notNull(),
});

export const food_log_item = sqliteTable("food_log_item", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  food_log_id: integer("food_log_id")
    .notNull()
    .references(() => food_log.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  unit: text("unit").notNull(),
  amount: integer("amount").notNull(),
  calories: integer("calories").notNull(),
  total_fat: integer("total_fat").notNull(),
  total_carb: integer("total_carb").notNull(),
  protein: integer("protein").notNull(),
});

// Export FoodItem to use as an interface in your app
export type FoodItem = typeof food_item.$inferSelect;
export type FoodLog = typeof food_log.$inferSelect;
export type FoodLogItem = typeof food_log_item.$inferSelect;

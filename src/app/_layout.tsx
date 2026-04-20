import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

export const DATABASE_NAME = "food_tracker.db";

const db = SQLite.openDatabaseSync(DATABASE_NAME);

export default function RootLayout() {
  useDrizzleStudio(db);

  return <Stack />;
}

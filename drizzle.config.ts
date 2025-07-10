import { defineConfig } from "drizzle-kit";

// Only configure database if DATABASE_URL is provided
const config = {
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql" as const,
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy",
  },
};

// Only validate DATABASE_URL if we're actually using the database
if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL not set - using in-memory storage only");
}

export default defineConfig(config);

import dotenvFlow from "dotenv-flow";
import { neon } from "@neondatabase/serverless";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
dotenvFlow.config();

// Neon SQL client
const sql = neon(process.env.DATABASE_URL);

async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      status BOOLEAN DEFAULT FALSE

    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL,
          name TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  console.log("✅ Database initialized successfully");
}

// Run script
initDB()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ DB init failed:", err);
    process.exit(1);
  });

export default sql;

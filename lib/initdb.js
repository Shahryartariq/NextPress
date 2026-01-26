import sql from "./db";

let initPromise = null;

export function initDb() {
  if (!initPromise) {
    initPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL,
          name TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `;
      console.log("✅ contacts table initialized");
    })();
  }

  return initPromise;
}
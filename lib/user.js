import sql from "../lib/db";

export async function createUser(email, hashedPassword) {
  const [user] = await sql`
    INSERT INTO users (email, password)
    VALUES (${email}, ${hashedPassword})
    RETURNING id, email;
  `;
  return user;
}

// Check if a user with the given email already exists
export async function existingUser(email) {
  const [user] = await sql`
    SELECT id, email
    FROM users
    WHERE email = ${email};
  `;

  return user || null; // returns user object if exists, otherwise null
}
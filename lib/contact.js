import sql from "../lib/db";

export async function createContact(email, name, message) {
  const [contact] = await sql`
    INSERT INTO contacts (email, name, message)
    VALUES (${email}, ${name}, ${message})
    RETURNING id, email, name, message, created_at
  `;

  return contact;
}

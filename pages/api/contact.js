import { initDb } from "../../lib/initdb";
import { createContact } from "../../lib/contact";

export default async function handler(req, res) {
  await initDb(); // GUARANTEED: runs once per server

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, name, message } = req.body;

  if (!email || !name || !message) {
    return res.status(422).json({ message: "Invalid input" });
  }

  const contact = await createContact(email, name, message);

  res.status(201).json({ message: "Saved", contact });
}

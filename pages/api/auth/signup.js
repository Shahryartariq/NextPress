import { initDb } from "../../lib/initdb";
import { createContact } from "../../lib/contact";

export default async function handler(req, res) {
  await initDb();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password || !email.includes("@") || password.trim().length < 7 ) {
    return res.status(422).json({ message: "Invalid input" });
  }

  const hashedPassword = await hashPassword(password);




  const contact = await createContact(email, name, message);

  res.status(201).json({ message: "Saved", contact });
}

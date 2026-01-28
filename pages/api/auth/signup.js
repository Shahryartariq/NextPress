import { createUser, existingUser } from "../../../lib/user";
import { hashPassword } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password || !email.includes("@") || password.trim().length < 7) {
    return res.status(422).json({ message: "Invalid input" });
  }

  const existingUserResult = await existingUser(email);
  if (existingUserResult) {
    return res.status(422).json({ message: "User already exists" });
  }



  try {
    const hashedPassword = await hashPassword(password);
    const result = await createUser(email, hashedPassword);
    return res.status(201).json({ message: "Created User", user: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

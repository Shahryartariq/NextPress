import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { existingUser, updateUserPassword } from "../../../lib/user";
import { verifyPassword, hashPassword } from "../../../lib/auth";

export default async function handler(req, res) {
  // Allow only PATCH requests
  if (req.method !== "PATCH") {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Validate session
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user?.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { email } = session.user;
    const { oldPassword, newPassword } = req.body;

    // Validate input
    if (
      !oldPassword ||
      !newPassword ||
      typeof newPassword !== "string" ||
      newPassword.trim().length < 7
    ) {
      return res.status(422).json({
        message: "Invalid input. Password must be at least 7 characters long.",
      });
    }

    // Fetch user
    const user = await existingUser(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isPasswordValid = await verifyPassword(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Current password is incorrect" });
    }

    // Update password
    const hashedPassword = await hashPassword(newPassword);
    const updatedUser = await updateUserPassword(email, hashedPassword);

    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update password" });
    }

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Password update error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

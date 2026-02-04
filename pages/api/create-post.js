import fs from "fs";
import path from "path";
import { generateMarkdown, generateSlug } from "@/lib/post-formatter";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const postData = req.body;

    const slug = generateSlug(postData.title);
    const markdown = generateMarkdown(postData);

    const postsDir = path.join(process.cwd(), "posts");

    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir);
    }

    fs.writeFileSync(
      path.join(postsDir, `${slug}.md`),
      markdown
    );

    res.status(200).json({ message: "Post created" });

  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
}
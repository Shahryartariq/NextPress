import fs from "fs";
import path from "path";

import { generateSlug, generateMarkdown } from "../../lib/post-formatter";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    const { title, excerpt, content, image } = req.body;

    const slug = generateSlug(title);

    const markdown = generateMarkdown({
      title,
      excerpt,
      content,
      image,
      date: new Date().toISOString(),
    });

    const filePath = path.join(process.cwd(), "posts", `${slug}.md`);

    fs.writeFileSync(filePath, markdown);

    res.status(201).json({ message: "Post created!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
}

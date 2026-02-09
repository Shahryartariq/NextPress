import fs from "fs";
import path from "path";
import formidable from "formidable";

import { generateSlug, generateMarkdown } from "../../lib/post-formatter";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method !== "POST") return;

  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: "File upload error" });
    }

    try {
      const title = fields.title[0];
      const excerpt = fields.excerpt[0];
      const content = fields.content[0];

      const slug = generateSlug(title);

      /* --------------------------
         IMAGE STORAGE
      -------------------------- */

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "images",
        "posts",
        slug
      );

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const file = files.thumbnail?.[0];

      let imagePath = "";

      if (file) {
        const ext = path.extname(file.originalFilename);

        if (![".png", ".jpg", ".jpeg"].includes(ext.toLowerCase())) {
          return res.status(400).json({ message: "Only PNG or JPEG allowed" });
        }

        const newFilePath = path.join(uploadDir, `${slug}${ext}`);

        fs.copyFileSync(file.filepath, newFilePath);

        imagePath = `${slug}${ext}`;
      }

      /* --------------------------
         MARKDOWN GENERATION
      -------------------------- */

      const markdown = generateMarkdown({
        title,
        excerpt,
        content,
        image: imagePath,
        date: new Date().toISOString().split("T")[0],
      });

      const postFilePath = path.join(process.cwd(), "posts", `${slug}.md`);

      fs.writeFileSync(postFilePath, markdown);

      res.status(201).json({ message: "Post created!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error creating post",
        error: error.message,
      });
    }
  });
}

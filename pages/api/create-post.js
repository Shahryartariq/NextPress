import fs from "fs";
import path from "path";
import formidable from "formidable";
import { getToken } from "next-auth/jwt";

import sql from "../../lib/db";
import { generateSlug, generateMarkdown } from "../../lib/post-formatter";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    /* --------------------------
       GET USER FROM NEXTAUTH
    -------------------------- */

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const email = token.email;

    /* --------------------------
       CHECK USER STATUS
    -------------------------- */

    const user = await sql`
      SELECT status FROM users WHERE email = ${email}
    `;

    if (!user.length || user[0].status === false) {
      return res.status(403).json({
        message: "User not allowed to create post",
      });
    }

    /* --------------------------
       PARSE FORM DATA
    -------------------------- */

    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
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
            return res
              .status(400)
              .json({ message: "Only PNG or JPEG allowed" });
          }

          const newFilePath = path.join(uploadDir, `${slug}${ext}`);

          fs.copyFileSync(file.filepath, newFilePath);

          // only store filename
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

        const postFilePath = path.join(
          process.cwd(),
          "posts",
          `${slug}.md`
        );

        fs.writeFileSync(postFilePath, markdown);

        return res.status(201).json({ message: "Post created!" });
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          message: "Error creating post",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Invalid or expired session",
    });
  }
}
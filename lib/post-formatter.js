// lib/post-formatter.js

// Generate SEO friendly slug from title
export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // Replace spaces with -
    .replace(/[^\w-]+/g, "")     // Remove special characters
    .replace(/--+/g, "-");       // Remove duplicate -
}

// Generate markdown content
export function generateMarkdown({ title, excerpt, date, image, content }) {
  return `---
title: "${title}"
excerpt: "${excerpt}"
date: "${date}"
image: "${image}"
isFeatured: false
---

${content}
`;
}
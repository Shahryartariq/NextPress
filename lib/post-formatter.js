export function generateMarkdown({
  title,
  date,
  image,
  excerpt,
  isFeatured,
  content,
}) {
  return `---
title: '${title}'
date: '${date}'
image: ${image}
excerpt: ${excerpt}
isFeatured: ${isFeatured}
---

${content}
`;
}

export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

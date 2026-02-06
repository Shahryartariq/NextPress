// lib/posts-util.js

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

// Get all markdown filenames
export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

// Get single post data
export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, "");

  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);

  return {
    slug: postSlug,
    ...data,
    content,
  };
}

// Get all posts
export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) =>
    getPostData(postFile)
  );

  return allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );
}

// Get featured posts only
export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
}
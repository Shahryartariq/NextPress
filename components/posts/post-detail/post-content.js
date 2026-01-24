import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import Markdown from 'react-markdown'

const DUMMY_POST = {
  slug: "getting-started-nextjs",
  title: "Get Started with Next.js",
  image: "getting-started-nextjs.png",
  date: "2026-01-01",
  content: "# Getting Started with Next.js\n\nNext.js is a React framework for production. It makes building web applications and sites easy.",
};

const PostContent = () => {
    const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;


  return <article className={classes.content}>
    <PostHeader title={DUMMY_POST.title} image={imagePath} />
    <Markdown>{DUMMY_POST.content}</Markdown>
  </article>;
};

export default PostContent;

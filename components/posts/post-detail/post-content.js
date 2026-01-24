import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import PostHeader from "./post-header";
import classes from "./post-content.module.css";

function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    img({ src, alt }) {
      const imageSrc = src.startsWith("/") ? src : `/images/posts/${post.slug}/${src}`;

      return <Image src={imageSrc} alt={alt} width={600} height={300} className={classes.image} />;
    },

    code({ inline, className, children }) {
      const match = /language-(\w+)/.exec(className || "");

      if (!inline && match) {
        return (
          <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div">
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        );
      }

      return <code className={className}>{children}</code>;
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;

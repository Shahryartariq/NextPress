import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import Html from "react-syntax-highlighter/dist/cjs/languages/prism/markup";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";


import PostHeader from "./post-header";
import classes from "./post-content.module.css";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("html", Html);
SyntaxHighlighter.registerLanguage("cpp", cpp);

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

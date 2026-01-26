import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

const AllPostsPage = (props) => {
  return (
    <>
      <Head>
        <title>All Post | Sherry's Blog</title>
        <meta name="description" content="A list of all posts related to programming, cyber and web development." />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
};

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;

import HeroSection from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";

const Homepage = (props) => {
  return (
    <>
      <Head>
        <title>NextPress | Sherry's Blog</title>
        <meta
          name="description"
          content="I post about programming, cyber and web development."
        />
      </Head>
      <HeroSection />
      <FeaturedPosts posts={props.posts} />
    </>
  );
};

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default Homepage;

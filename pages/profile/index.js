import { getSession } from "next-auth/react";
import UserProfile from "../../components/profile/user-profile";
import Head from "next/head";

function UserProfilePage() {
  return (
    <>
      <Head>
        <title>Profile Page | NextPress</title>
      </Head>
      <UserProfile />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default UserProfilePage;

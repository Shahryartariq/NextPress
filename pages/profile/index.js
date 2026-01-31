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

export default UserProfilePage;

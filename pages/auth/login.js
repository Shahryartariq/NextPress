import Head from "next/head";
import AuthForm from "../../components/auth/login/auth-form";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    };
    checkSession();
  }, [router]);

  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Authentication Page | NextPress</title>
      </Head>
      <AuthForm />
    </>
  );
}

export default LoginPage;

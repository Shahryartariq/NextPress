import Head from "next/head";
import AuthForm from "../../components/auth/login/auth-form";

function LoginPage() {
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

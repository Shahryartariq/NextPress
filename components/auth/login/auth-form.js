import { useState, useRef } from "react";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function switchAuthModeHandler() {
    if (isLoading) return;
    setIsLogin((prev) => !prev);
    setError(null);
  }

  async function submitHandler(event) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!enteredEmail || !enteredPassword) {
      setError("Email and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });

        if (result.error) {
          setError("Invalid email or password.");
          setIsLoading(false);
          return;
        }

        router.replace("/posts");
      } else {
        await createUser(enteredEmail, enteredPassword);
        router.push("/auth/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      {error && <p className={classes.error}>{error}</p>}

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} disabled={isLoading} />
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} disabled={isLoading} />
        </div>

        <div className={classes.actions}>
          <button disabled={isLoading}>
            {isLoading ? (isLogin ? "Logging in..." : "Creating account...") : isLogin ? "Login" : "Create Account"}

            {isLoading && <span className={classes.spinner}></span>}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;

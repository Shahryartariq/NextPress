import { useState, useRef } from "react";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create account.");
  }

  return data;
}

function AuthForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  const [mode, setMode] = useState("login"); // login | signup
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  /* ----------------------------- Helpers ----------------------------- */

  function resetInputs() {
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  }

  function switchModeHandler() {
    if (loading) return;

    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setError(null);
    resetInputs();
  }

  /* ----------------------------- Submit ----------------------------- */

  async function submitHandler(e) {
    e.preventDefault();

    if (loading) return;

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      /* ---------- LOGIN ---------- */
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          throw new Error("Invalid email or password.");
        }

        resetInputs();
        router.replace("/posts");
      }

      /* ---------- SIGNUP ---------- */
      else {
        await createUser(email, password);

        // Switch back to login after success
        resetInputs();
        setMode("login");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* ----------------------------- UI ----------------------------- */

  const submitText = loading
    ? isLogin
      ? "Logging in..."
      : "Creating account..."
    : isLogin
    ? "Login"
    : "Create Account";

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Create Account"}</h1>

      {error && <p className={classes.error}>{error}</p>}

      <form onSubmit={submitHandler}>
        {/* Email */}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            required
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            required
            disabled={loading}
          />
        </div>

        {/* Actions */}
        <div className={classes.actions}>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={classes.primaryBtn}
          >
            {loading && <span className={classes.spinner}></span>}
            {submitText}
          </button>

          {/* Toggle Mode */}
          <button
            type="button"
            onClick={switchModeHandler}
            disabled={loading}
            className={classes.toggle}
          >
            {isLogin
              ? "Create new account"
              : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
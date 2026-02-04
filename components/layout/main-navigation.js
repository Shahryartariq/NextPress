"use client";

import Link from "next/link";
import Logo from "./logo";
import classes from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";

const MainNavigation = () => {
  const { data: session, status } = useSession();

  function logoutHandler(event) {
    event.preventDefault();
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/posts/create">Create Post</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
           <li>
            {status === "authenticated" && (
              <Link href="/profile">Profile</Link>
            )}
          </li>
          <li>
            {status === "authenticated" ? (
              <Link href="/auth/logout" onClick={logoutHandler}>Logout</Link>
            ) : (
              <Link href="/auth/login">Login</Link>
            )}
          </li>
         
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

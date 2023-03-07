import React from "react";
import Link from "next/link";

const Landing = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link href="/auth/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Landing;

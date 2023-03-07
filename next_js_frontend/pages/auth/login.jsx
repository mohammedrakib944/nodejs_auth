import { useState } from "react";
import Link from "next/link";
import axios from "axios";

import { useRouter } from "next/router";

const login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios({
      url: "http://localhost:8000/login",
      method: "POST",
      data: {
        username,
        password,
      },
      withCredentials: true,
    });

    console.log(res.data.data);

    if (res.data.status === "OK") {
      router.push("/dashboard/home");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Link href="/">Go Landing page</Link>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          onChange={(e) => setusername(e.target.value)}
          placeholder="username"
        />
        <input
          type="passowrd"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default login;

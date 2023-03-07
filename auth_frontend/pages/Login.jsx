import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

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
    console.log(res.data);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <Link to="/">Go Home</Link>
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

export default Login;

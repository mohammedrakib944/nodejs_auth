import React from "react";
import Link from "next/link";
import axios from "axios";

const home = () => {
  const postRequest = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        url: "http://localhost:8000/post",
        method: "POST",
        withCredentials: true,
      });

      console.log("Post Response: ", res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1>Protexted Route</h1>
      <Link href="/auth/login">Logout</Link>
      <h2>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
        voluptates qui voluptatum architecto optio sit fugit laudantium incidunt
        dolor molestiae consectetur illum, minus velit quas. Vero doloribus
        mollitia tenetur suscipit.
      </h2>

      <button onClick={postRequest}>POST</button>
    </div>
  );
};

export default home;

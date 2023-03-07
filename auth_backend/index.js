const express = require("express");
const cookieParser = require("cookie-parser");
const jose = require("jose");
const conn = require("./database/connection");
const cors = require("cors");
const checkAuth = require("./authCheck");
const app = express();
const PORT = 8000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Login
app.use("/login", (req, res) => {
  const { username, password } = req.body;

  const SQLQuery = `SELECT * FROM  users WHERE name='${username}'`;
  conn.query(SQLQuery, async (err, result) => {
    if (err || result.length == 0) {
      console.log("Error: ", err);
      return res.json({ message: "No user Found!" });
    }
    if (result[0].password === password) {
      // Create Jose TOKEN
      const joseToken = await new jose.SignJWT({ username: username })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(new TextEncoder().encode("rakib_sycret_key"));

      // Set timer 5 min
      var tokenTime = new Date(new Date().getTime() + 5 * 60 * 1000);
      const options = {
        expires: tokenTime,
        httpOnly: true,
        secure: true,
      };

      // Set cookie
      res.cookie("access_token", joseToken, options);
      res.json({
        status: "OK",
        message: "Login Success!",
        data: { username },
      });
    } else {
      return res.send("Password is wrong!");
    }
  });
});

app.use("/post", checkAuth, (req, res) => {
  res.send("Here There");
});

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});

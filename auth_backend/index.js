const express = require("express");
const conn = require("./database/connection");
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// Login
app.use("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    res.status(400).send("username and password is required!");
  const SQLQuery = `SELECT * FROM  users WHERE name='${username}'`;
  conn.query(SQLQuery, (err, result) => {
    if (err) {
      console.log("Error: ", err);
    }
    if (result[0].password === password) {
      const token = "THisMaybeJWTtoken";
      var inOneMinutes = new Date(new Date().getTime() + 1 * 60 * 1000);
      const options = {
        expires: inOneMinutes,
        httpOnly: true,
        secure: true,
      };
      res.cookie("token", token, options);
      res.json({ status: "OK", message: "Login Success!" });
    } else {
      res.send("Password is wrong!");
    }
  });
});

// CHECK TOKEN
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      return res.status(401).json("You need to Login");
    }
    const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decrypt.id,
      firstname: decrypt.firstname,
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});

const jose = require("jose");

const checkAuth = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("You need to Login");
  }

  try {
    console.log("TOken: ", token);
    // verify token
    const secret = new TextEncoder().encode("rakib_sycret_key");
    await jose.jwtVerify(token, secret);
    next();
  } catch (err) {
    return res.status(500).json({ mess: "You are not valid!", err });
  }
  next();
};

module.exports = checkAuth;

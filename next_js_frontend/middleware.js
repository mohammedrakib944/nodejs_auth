import { NextResponse } from "next/server";
// import { verify } from "jsonwebtoken";
import { jwtVerify } from "jose";

// const url = req.nextUrl.clone()
// url.pathname = '/login'
// return NextResponse.redirect(url)

export default middleware = async (req) => {
  let jwtToken = req.cookies.get("access_token");

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    // If there is no jwtToken token on cookie return to login page
    if (jwtToken === undefined) {
      return NextResponse.rewrite(new URL("/auth/login", req.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(jwtToken.value, secret);
      return NextResponse.next();
    } catch (error) {
      console.log("Token varification failed: ", error);
      return NextResponse.rewrite(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
};

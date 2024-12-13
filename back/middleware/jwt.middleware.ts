import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user/user.model";
dotenv.config();

// Define a custom getToken function
function getTokenFromQueryOrHeader(req: any): string | undefined {
  // Check if the route is in the list where token can be in the query
  const queryTokenRoutes: Array<String> = [];
  console.log(req.path);
  // if part of url is in queryTokenRoutes and token is in query string
  if (
    queryTokenRoutes.some((route) => req.path.includes(route)) &&
    req.query.token
  ) {
    console.log("Token from query string");
    return req.query.token; // Use token from query string
    // Return undefined if no token is found
    return undefined;
  }
  // Default: Use token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
}

export const jwtMiddleware = expressjwt({
  secret: (process.env.JWT_SECRET as string) ?? "test",
  algorithms: ["HS256"],
  requestProperty: "user",
  credentialsRequired: true,
  getToken: getTokenFromQueryOrHeader, // Use custom token retrieval function
}).unless({
  path: ["/api/auth/login", "/api/auth/register", "/api"], // Define paths to bypass authentication
});

export function generateTokenFromUser(user: User): string {
  return jwt.sign(
    { id: user.get().id, email: user.get().email },
    (process.env.JWT_SECRET as string) ?? "test",
    { expiresIn: "1h" }
  );
}
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { User } from "../models/user/user.model";
import dotenv from "dotenv";
dotenv.config();

// Define a custom getToken function
function getTokenFromQueryOrHeader(req: any): string | undefined {
  // Check if the route is in the list where token can be in the query
  const queryTokenRoutes: Array<String> = [];
  // if part of url is in queryTokenRoutes and token is in query string
  if (
    queryTokenRoutes.some((route) => req.path.includes(route)) &&
    req.query.token
  ) {
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

  //getToken: getTokenFromQueryOrHeader, // Use custom token retrieval function
}).unless({
  path: ["/api/auth/login", "/api/auth/register"], // Define paths to bypass authentication
});

export function generateTokenFromUser(user: any): string {
  return jwt.sign(
    { id: user.id, email: user.email, password: user.password,  role: user.role },
    (process.env.JWT_SECRET as string) ?? "test",
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
}

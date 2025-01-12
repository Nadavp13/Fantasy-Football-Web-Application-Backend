import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // `user` can be a string (like an email) or a JWT payload
    }
  }
}

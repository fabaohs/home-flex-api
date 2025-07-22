import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

interface IClaims {
  email: string;
  name: string;
  userId: number;
}

export const generateAccessToken = (claims: IClaims) => {
  const token = jwt.sign({ claims }, String(process.env.JWT_SECRET), {
    expiresIn: "1h",
    subject: String(claims.userId),
  });

  return token;
};

export const generateRefreshToken = (userId: number) => {
  const jti = randomUUID();

  const refreshToken = jwt.sign(
    { jti, userId },
    String(process.env.JWT_REFRESH_SECRET),
    {
      expiresIn: "30d",
      subject: String(userId),
    }
  );

  return refreshToken;
};

export const decodeToken = async (
  type: "access" | "refresh",
  token: string
) => {
  return jwt.verify(
    token,
    type === "access"
      ? String(process.env.JWT_SECRET)
      : String(process.env.JWT_REFRESH_SECRET)
  );
};

export default {
  decodeToken,
  generateAccessToken,
  generateRefreshToken,
};

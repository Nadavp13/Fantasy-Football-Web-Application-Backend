import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User.Schema";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "your_refresh_secret";

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate tokens
  const accessToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, {
    expiresIn: "7d",
  });

  // Save the refresh token in the database
  user.refreshTokens?.push(refreshToken);
  await user.save();

  return { accessToken, refreshToken, user };
};

const logoutUser = async (email: string, refreshToken: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  user.refreshTokens = user.refreshTokens?.filter((token) => token !== refreshToken);
  await user.save();
};

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const decoded: any = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.refreshTokens?.includes(refreshToken)) {
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "15m",
    });

    return newAccessToken;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

export default {
  loginUser,
  logoutUser,
  refreshAccessToken,
};

import { Request, Response } from "express";
import authService from "../services/auth.service";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken, user } = await authService.loginUser(email, password);
    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

const logout = async (req: Request, res: Response) => {
  const { email, refreshToken } = req.body;

  try {
    await authService.logoutUser(email, refreshToken);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export default {
  login,
  logout,
  refresh,
};

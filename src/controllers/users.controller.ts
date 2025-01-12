import User, { IUser } from "../models/User.Schema";
import usersService from "../services/users.service";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  const user: IUser = req.body;
  try {
    const newUser = await usersService.createUser(user);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await usersService.getUserByEmail(req.params.email);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const user: Partial<IUser> = req.body;
  try {
    const updatedUser = await usersService.updateUser(req.params.email, user);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const removeUser = async (req: Request, res: Response) => {
  try {
    const user = await usersService.removeUser(req.params.email);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  removeUser,
};

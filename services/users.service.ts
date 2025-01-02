import UserService, { IUser } from "../models/User.Schema";

const createUser = async (user: IUser) => {
  const checkUser = await UserService.findOne({ email: user.email });
  if (checkUser) {
    throw new Error("User with this email already exists");
  } else {
    const newUser = new UserService(user);
    return await newUser.save();
  }
};

const getUserByEmail = async (email: string) => {
  if (!email) throw new Error("User email is required");
  try {
    const user = await UserService.findOne({ email });
    if (user) return user;
    throw new Error("User not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const getAllUsers = async () => {
  try {
    return await UserService.find({});
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw new Error("Error fetching users");
  }
};

const updateUser = async (email: string, user: Partial<IUser>) => {
  if (!email) throw new Error("User email is required");
  try {
    const updatedUser = await UserService.findOneAndUpdate(
      { email },
      user,
      { new: true }
    );
    if (updatedUser) return updatedUser;
    throw new Error("User not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const removeUser = async (email: string) => {
  if (!email) throw new Error("User email is required");
  try {
    const user = await UserService.deleteOne({ email });
    if (user.deletedCount > 0) return { message: "User successfully deleted" };
    throw new Error("User not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export default {
  createUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  removeUser,
};

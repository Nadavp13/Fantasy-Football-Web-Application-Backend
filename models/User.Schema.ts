import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  refreshTokens?: string[];
  role: "admin" | "user";
  status: "active" | "suspended";
  emailVerified: boolean;
  passwordUpdatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 55,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profileImage: {
      type: String,
      match: /\.(jpeg|jpg|gif|png)$/,
      default: "public/default-image.png",
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "suspended"],
      default: "active",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    passwordUpdatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("user", UserSchema, "users");
export default User;

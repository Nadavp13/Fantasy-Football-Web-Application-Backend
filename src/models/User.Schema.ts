import mongoose from "mongoose";
import { ILineup } from "./Lineup.Schema"; // Corrected import

export interface IUser {
  email: string;
  password: string;
  role: "admin" | "user";
  lineup: mongoose.Types.ObjectId | null; // Reference to a Lineup document
  leagues: mongoose.Types.ObjectId[]; // List of league IDs
  refreshTokens: string[]; // Array to store refresh tokens
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 55,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation regex
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    lineup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lineup",
      default: null, // Defaults to null for an empty lineup
    },
    leagues: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "league", // Assuming "league" is the collection name
      default: [], // Defaults to an empty list
    },
    refreshTokens: {
      type: [String],
      default: [], // Defaults to an empty array
    },
  },
  {
    timestamps: true, // Automatically includes `createdAt` and `updatedAt`
  }
);

const User = mongoose.model<IUser>("user", UserSchema, "users");
export default User;

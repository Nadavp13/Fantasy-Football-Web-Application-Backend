import mongoose from "mongoose";

export interface IFootballPlayer {
    name: string;
    league: "English Premier League" | "Scottish Premier League" | "Danish Superliga"; 
    team: string;
    price: number;
    totalPoints: number;
    weeklyPoints: number[]; 
    position: "FWD" | "MID" | "DEF" | "GK";
    image? : string; 
}

const FootballPlayerSchema = new mongoose.Schema<IFootballPlayer>({
    name: { type: String, required: true },
    league: { 
        type: String, 
        required: true,
        enum: ["English Premier League", "Scottish Premier League", "Danish Superliga"], 
    },
    team: { type: String, required: true },
    price: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    weeklyPoints: { type: [Number], required: true }, 
    position: { 
        type: String, 
        required: true,
        enum: ["FWD", "MID", "DEF", "GK"], 
    },
    image: { type: String, required: false }
});

const FootballPlayer = mongoose.model<IFootballPlayer>("footballPlayer", FootballPlayerSchema, "footballPlayers");
export default FootballPlayer;

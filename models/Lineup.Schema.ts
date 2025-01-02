import mongoose from "mongoose";

export interface ILineup {
    owner?: string;
    formation: string;
    matchDay: Number;
    goalkeeper: mongoose.Schema.Types.ObjectId;
    defenders: mongoose.Schema.Types.ObjectId[]; 
    midfielders: mongoose.Schema.Types.ObjectId[]; 
    attackers: mongoose.Schema.Types.ObjectId[]; 
}

const LineupSchema = new mongoose.Schema<ILineup>({
    owner: { type: String },
    formation: { type: String, required: true },
    matchDay: { type: Number, required: true },
    goalkeeper: { type: mongoose.Schema.Types.ObjectId, ref: "footballPlayer", required: true },
    defenders: { type: [mongoose.Schema.Types.ObjectId], ref: "footballPlayer", required: true },
    midfielders: { type: [mongoose.Schema.Types.ObjectId], ref: "footballPlayer", required: true },
    attackers: { type: [mongoose.Schema.Types.ObjectId], ref: "footballPlayer", required: true },
});
const Lineup = mongoose.model<ILineup>("lineup", LineupSchema, "lineups");
export default Lineup;

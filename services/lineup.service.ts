import LineupService, {ILineup} from "../models/Lineup.Schema";


const createLineup = async (lineup: ILineup) => {
    const checkLineup = await LineupService.findOne({lineup});
    if(checkLineup){
        throw new Error('Football player already exists');
    }
    else{
        const newLineup = new LineupService(lineup);
        return await newLineup.save();
    }
}

const getLineupByOwner = async (owner: string) => {
    if (!owner) throw new Error("Lineup owner is required");
    try {
        const lineup = await LineupService.findOne({ owner });
        if (lineup) return lineup;
        throw new Error("Lineup not found");
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }

const getAllLineups = async () => {
    try {
        return await LineupService.find({});
    }
    catch (error) {
        console.error('Error fetching all lineups:', error);
    }
}

const updateLineup = async (owner: string, lineup: ILineup) => {
    if (!owner) throw new Error("Lineup owner is required");
    try {
        const updateLineup = await LineupService.findOneAndUpdate({ owner }, lineup, { new: true });
        if (updateLineup) return updateLineup;
        throw new Error("Lineup not found");
    } catch (error: any) {  
        throw new Error(error?.message);
    }  
    
}

const removeLineup = async (owner: string) => {
    if (!owner) throw new Error("Lineup owner is required");
  try {
    const lineup = await LineupService.deleteOne({ owner });
    if (lineup) return lineup;
    throw new Error("Lineup not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};



export default {
    createLineup,
    getLineupByOwner,
    getAllLineups,
    updateLineup,
    removeLineup
}
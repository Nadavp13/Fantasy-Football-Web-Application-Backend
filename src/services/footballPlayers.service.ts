import FootballPlayerService, {IFootballPlayer} from "../models/FootballPlayer.Schema";


const createFootballPlayer = async (footballPlayer: IFootballPlayer) => {
    const checkFootballPlayer = await FootballPlayerService.findOne({footballPlayer});
    if(checkFootballPlayer){
        throw new Error('Football player already exists');
    }
    else{
        const newFootballPlayer = new FootballPlayerService(footballPlayer);
        return await newFootballPlayer.save();
    }
}

const getFootballPlayerByName = async (name: string) => {
    if (!name) throw new Error("Player name is required");
    try {
        const footballPlayer = await FootballPlayerService.findOne({ name });
        if (footballPlayer) return footballPlayer;
        throw new Error("Player not found");
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }

const getAllFootballPlayers = async () => {
    try {
        return await FootballPlayerService.find({});
    }
    catch (error) {
        console.error('Error fetching all football players:', error);
    }
}

const updateFootballPlayer = async (name: string, footballPlayer: IFootballPlayer) => {
    if (!name) throw new Error("Player name is required");
    try {
        const updateFootballPlayer = await FootballPlayerService.findOneAndUpdate({ name }, footballPlayer, { new: true });
        if (updateFootballPlayer) return updateFootballPlayer;
        throw new Error("Player not found");
    } catch (error: any) {  
        throw new Error(error?.message);
    }  
    
}

const removeFootballPlayer = async (name: string) => {
    if (!name) throw new Error("Player name is required");
  try {
    const footballPlayer = await FootballPlayerService.deleteOne({ name });
    if (footballPlayer) return footballPlayer;
    throw new Error("Player not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};



export default {
    createFootballPlayer,
    getFootballPlayerByName,
    getAllFootballPlayers,
    updateFootballPlayer,
    removeFootballPlayer
}
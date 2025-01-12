import FootballPlayer, { IFootballPlayer } from "../models/FootballPlayer.Schema";
import footballPlayersService from "../services/footballPlayers.service";
import { Request, Response } from "express";

const createFootballPlayer = async (req: Request, res: Response)=> {
    const footballPlayer: IFootballPlayer = req.body;
    try{
        const newFootballPlayer = await footballPlayersService.createFootballPlayer(footballPlayer);
        res.status(201).json(newFootballPlayer);
    }
    catch (error: any){
        res.status(500).json({message: error.message});
    }
}

const getFootballPlayerByName = async (req: Request, res: Response) => {
    try{
        const footballPlayer = await footballPlayersService.getFootballPlayerByName(req.params.name);
        res.status(200).json(footballPlayer);
    }
    catch(error: any){
        res.status(500).json({message: error.message});
    }
};

const getAllFootballPlayers = async (req: Request, res: Response) => {
    try{
        const footballPlayers = await footballPlayersService.getAllFootballPlayers();
        res.status(200).json(footballPlayers);
    }
    catch(error: any){
        res.status(500).json({message: error.message});
    }
};

const updateFootballPlayer = async (req: Request, res: Response) => {
    const footballPlayer: IFootballPlayer = req.body;
    try{
        const updatedFootballPlayer = await footballPlayersService.updateFootballPlayer(req.params.name, footballPlayer);
        res.status(200).json(updatedFootballPlayer);
    }
    catch(error: any){
        res.status(500).json({message: error.message});
    }
};

const removeFootballPlayer = async (req: Request, res: Response) => {
    try {
      const footballPlayer = await footballPlayersService.removeFootballPlayer(req.params.name);
      res.status(200).json(footballPlayer);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };



export default {
    createFootballPlayer,
    getFootballPlayerByName,
    getAllFootballPlayers,
    updateFootballPlayer,
    removeFootballPlayer
}
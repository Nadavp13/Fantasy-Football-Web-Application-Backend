import Lineup, { ILineup } from "../models/Lineup.Schema";
import lineupsService from "../services/lineups.service";
import { Request, Response } from "express";

const createLineup = async (req: Request, res: Response)=> {
    const Lineup: ILineup = req.body;
    try{
        const newLineup = await lineupsService.createLineup(Lineup);
        res.status(201).json(newLineup);
    }
    catch (error: any){
        res.status(500).json({message: error.message});
    }
}

const getLineupByOwner = async (req: Request, res: Response) => {
    try{
        const Lineup = await lineupsService.getLineupByOwner(req.params.name);
        res.status(200).json(Lineup);
    }
    catch(error: any){
        res.status(500).json({message: error.message});
    }
};

const getAllLineups = async (req: Request, res: Response) => {
    try{
        const Lineups = await lineupsService.getAllLineups();
        res.status(200).json(Lineups);
    }
    catch(error: any){
        res.status(500).json({message: error.message});
    }
};

const updateLineup = async (req: Request, res: Response) => {
    const Lineup: ILineup = req.body;
    try{
        const updatedLineup = await lineupsService.updateLineup(req.params.owner, Lineup);
        res.status(200).json(updatedLineup);
    }
    catch(error: any){
        res.status(500).json({message: error.message});
    }
};

const removeLineup = async (req: Request, res: Response) => {
    try {
      const Lineup = await lineupsService.removeLineup(req.params.owner);
      res.status(200).json(Lineup);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };



export default {
    createLineup,
    getLineupByOwner,
    getAllLineups,
    updateLineup,
    removeLineup
}
import express, { Express } from "express";
import FootballPlayerRoutes from "./routes/footballPlayers.routes";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import FootballPlayer from "./models/FootballPlayer.Schema";
import mongoose from "mongoose";

if(process.env.NODE_ENV !== 'production') {
    dotenv.config(); // { path: path.resolve(__dirname, '../.env') }
}
console.log('Environment Variables:', process.env.DATABASE_URL);

const app: Express = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(express.static('public'));

app.use('/', FootballPlayerRoutes);
FootballPlayer.create();


const connectDB = () => {
    try {
      mongoose.connect(process.env.DATABASE_URL!);
      mongoose.connection.once("open", () => {
        console.log("Server is connected to MongoDB");
      });
    } catch (error) {
      console.error("Server -" + error);
      process.exit(-1);
    }
  };

  connectDB();


app.listen(process.env.PORT || 3000);
import express, { Express } from "express";
import footballPlayerRoutes from "./src/routes/footballPlayers.routes";
import userRoutes from "./src/routes/users.routes";
import authRoutes from "./src/routes/auth.routes";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import FootballPlayer from "./src/models/FootballPlayer.Schema";
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

app.use('/footballPlayers', footballPlayerRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);


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
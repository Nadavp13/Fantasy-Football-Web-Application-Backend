/*import express, {Express} from 'express';
import FootballPlayerRoutes from './routes/FootballPlayerRoutes';


if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // { path: path.resolve(__dirname, '../.env') }
}
console.log('Environment Variables:', process.env.DATABASE_URL);

const app = express();

app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,
    useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', require('./routes/index'));

app.listen(process.env.PORT || 3000);*/
import express from 'express';
const app = express();
import { PORT } from './config';
import { database } from './database';

import cors from "cors"
import morgan from "morgan"

import { volunteerRoutes } from './routes/volunteer';

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/volunteer", volunteerRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
})





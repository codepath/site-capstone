import express from 'express';
export const app = express();
import { PORT } from './config';
import { database } from './database';
import { authRoutes } from './routes/auth';

import cors from "cors"
import morgan from "morgan"

import { volunteerRoutes } from './routes/volunteer';

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/volunteer", volunteerRoutes)
// app.use("/volunteer", volunteerRoutes)
app.use("/auth", authRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
})





import express from 'express';
import 'dotenv/config';
import { connectionDB } from './db/config.js';
import syncDB from './db/init.js';
import allRoutes from './routes/index.js';

const app = express();
connectionDB();
syncDB();

app.use(express.json());
app.use(allRoutes);

app.listen(3000, () => {
  console.log(`Server is running on Port 3000`);
});

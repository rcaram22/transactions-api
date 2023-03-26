import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { dbConnect } from './config/mongo';
import { ErrorHandler } from './utils/error.handler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', routes);

// 404 middleware
app.use((req, res, next) => {
  res.sendStatus(404);
});

dbConnect()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log('Error connecting to DB');
    console.error(err);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

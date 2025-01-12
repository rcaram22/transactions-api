import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { dbConnect } from './config/mongo';
import { handleError } from './middleware/error.middleware';
import { ErrorHandler } from './utils/error.handler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', routes);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ErrorHandler(404, 'Route not found'));
});

// Global Error Handler
app.use(handleError);

dbConnect()
  .then(() => {
    console.log('✅ Connected to DB');

    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to DB:', err);
    process.exit(1);
  });

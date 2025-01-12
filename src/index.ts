import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { dbConnect } from './config/mongo';
import { handleError } from './middleware/error.middleware';
import { ErrorHandler } from './utils/error.handler';
import logger from './utils/log.handler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// HTTP request logging with Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Console log for development
}

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
    logger.info('✅ Connected to DB');

    app.listen(port, () => {
      logger.info(`🚀 Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    logger.error('❌ Error connecting to DB:', err);
    process.exit(1);
  });

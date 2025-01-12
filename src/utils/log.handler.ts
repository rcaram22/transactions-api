import { createLogger, format, transports } from 'winston';
import path from 'path';

// Define log format
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: path.join('logs', 'error.log'), level: 'error' }), // Error logs
    new transports.File({ filename: path.join('logs', 'combined.log') }), // All logs
  ],
});

// Stream for Morgan
(logger as any).stream = {
  write: (message: string) => logger.info(message.trim()),
};

export default logger;

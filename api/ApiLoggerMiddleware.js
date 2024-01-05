import { logger } from './logger.js';


export const ApiLoggerMiddleware = (req, res, next) => {
    const logMessage = `${req.method} ${req.url}`;
    logger.info(logMessage);
    next(); 
}
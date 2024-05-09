import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import https from 'https';
import path from 'path';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

import indexRouter from './routes/index.route';
import userRouter from './routes/user.route';
import taskRouter from './routes/task.route';
import logger from './utils/logger';
import logRequest from './middleware/logRequest.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI || '').then(() => {
    logger.info('Connected to MongoDB...');
}).catch((err) => {
    logger.error(`Error connecting to MongoDB: ${err}`);
});

// rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})
app.use(limiter);

// middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
})
app.use(express.json());
app.use(logRequest);
app.use(cors());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/task', taskRouter);

// configure HTTPS server
const options = {
    key: fs.readFileSync(path.join(__dirname, process.env.SSL_KEY || '')),
    cert: fs.readFileSync(path.join(__dirname, process.env.SSL_CERT || ''))
};

https.createServer(options, app).listen(port, () =>{
    logger.info(`Server listening on port ${port}...`);
})

// handle SIGINT signal
process.on('SIGINT', async () => {
    mongoose.disconnect().then(() => {
        logger.info('Disconnected from MongoDB...');
    }).catch(() => {
        logger.error('Error disconnecting from MongoDB...');
    })
    logger.info('Server shutting down...');
    process.exit(0);
});

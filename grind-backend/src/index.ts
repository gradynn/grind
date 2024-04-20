import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import indexRouter from './routes/index.route';
import userRouter from './routes/user.route';
import authenticateAPIKey from './middleware/authenticateAPIKey.middleware';
import logger from './utils/logger';
import logRequest from './middleware/logRequest.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_DB_URI || '').then(() => {
    logger.info('Connected to MongoDB...');
}).catch((err) => {
    logger.error(`Error connecting to MongoDB: ${err}`);
});

app.use(express.json());
app.use(authenticateAPIKey);
app.use(logRequest);

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    logger.info(`Server started at http://localhost:${port}`);
})

process.on('SIGINT', async () => {
    logger.info('Server shutting down...');
    process.exit(0);
});

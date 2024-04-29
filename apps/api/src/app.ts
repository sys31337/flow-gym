import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import api from './routes';
import { errorHandler, notFound } from './middlewares/error';
import { connectDB } from './config/mongoose';

dotenv.config({ path: path.join(__dirname, '../.env') });

export interface ProcessEnv {
  [key: string]: string | undefined;
}
const app: express.Application = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const devOrigins = process.env.CORS_FRONTEND_DEV_DOMAINS?.split(' ');
const prodOrigins = process.env.CORS_FRONTEND_PROD_DOMAINS?.split(' ');

// const origin = process?.env.NODE_ENV === 'development' ? devOrigins : prodOrigins;

const origin = (thisOrigin: string | undefined, callback: (err: Error | null, o?: boolean | string | RegExp | (boolean | string | RegExp)[]) => void) => {
  // db.loadOrigins is an example call to load
  // a list of origins from a backing database
  const envOrigins = process?.env.NODE_ENV === 'development' ? devOrigins : prodOrigins;
  const list = [...envOrigins, thisOrigin];
  callback(null, list);
  // db.loadOrigins(function (error, origins) {
  //   callback(error, origins)
  // });
};

app.use(helmet());

app.use(cors({
  origin,
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** Initialise mongoose connection */
connectDB();

app.use('/api', api);

app.use(notFound);
app.use(errorHandler);

export default app;

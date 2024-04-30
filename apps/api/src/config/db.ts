import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { DATABASEURI } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect(DATABASEURI as string, { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions);

export const db: mongoose.Connection = mongoose.connection;

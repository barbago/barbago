import 'reflect-metadata';

import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import {
  decodeToken,
  errorHandler,
  notFoundHandler,
} from './middlewares';
import { router } from './routes';
import { connect } from './config/database';
import { Client, User } from './entities';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({ origin: true }));
app.use(helmet());
app.use(morgan('tiny'));
app.use(decodeToken);

app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

async function main() {
  try {
    const connection = await connect();
    const result = await connection
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .leftJoinAndSelect('user.client', 'client')
      .getMany();
    // const result = await Client.find({ relations: ['user'] });
    // const result = await User.find({ relations: ['client'] });
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

main();

// https://www.freecodecamp.org/news/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c/

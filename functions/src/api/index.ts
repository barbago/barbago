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
import { router } from './router';

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

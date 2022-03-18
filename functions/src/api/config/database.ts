import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnection,
} from 'typeorm';

import { config, environment } from '.';
import { entities } from '../entities';

const { host, port, name, username, password } = config;

export const dbConfig: ConnectionOptions = {
  type: 'mysql',
  host: host,
  port: parseInt(port ?? '3306'),
  database: name,
  username: username,
  password: password,
  synchronize: true,
  logging: false,
  entities: [...entities],

  ...(environment.isProd && {
    logging: false,
    synchronize: false,
  }),
};

// https://fireship.io/lessons/sql-firebase-typeorm/
export const connect = async () => {
  let connection: Connection;

  try {
    connection = getConnection();
  } catch (err) {
    connection = await createConnection(dbConfig);
  }

  return connection;
};

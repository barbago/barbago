import * as dotenv from 'dotenv';

const isEnv = dotenv.config();

if (!isEnv) throw new Error('Could not find .env file!');

export * as config from './config';
export * as environment from './environment';

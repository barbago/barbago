// https://kulshekhar.github.io/ts-jest/docs/getting-started/options/

import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};

export default config;

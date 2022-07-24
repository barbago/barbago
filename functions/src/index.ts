import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import 'firebase-functions';

admin.initializeApp();

import { app } from './api';

export const api = functions.https.onRequest(app);

export * from './auth';
export * from './firestore';
export * from './pubsub';

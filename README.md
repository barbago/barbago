# Barbago

Barbago is an app that connects barbers to their clients.

## Project Overview

This project is organized as a monorepository, with all code pertaining to Barbago being stored in one place.

### Functions Directory

Contains Firebase functions and Express app. Deploys to <https://api.barbago.app>.

Also contains a `/docs` directory for API Documentation which deploys to <https://docs.barbago.app>.

### Site Directory

Contains static HTML for deployment. Deploys to <https://site.barbago.app>.

### UI Directory

All the code for the React Native project is located here. Deploys to <https://barbago.app>.

## Deployment

This project uses Expo and Firebase for deployment.

There are two deployment environments: `dev` and `prod`.

### Functions Deployment

To deploy Functions in development, use `firebase deploy` or `npm run deploy`. This will upload all statically hosted files as well as update firebase functions.

### UI Deployment

Todo: automatic deploys of the Expo app have not been implemented yet.

## Development Workflow

Todo: create an automatic build pipeline with github actions and such.

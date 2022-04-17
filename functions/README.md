# Barbago API

This repository contains the codebase for Barbago's backend REST API.

## Deploying

The Barbago API uses Firebase for hosting and deployment as well as handling authentication.

## Testing

[Unit Testing Firebase Functions](https://firebase.google.com/docs/functions/unit-testing)

## Environment

Environment variables are set direclty in the Firebase command line. These can be pushed to production with a `firebase deploy`.

You can set variables one at a time or use a json file in the below format:
`firebase functions:config:set env="$(cat env/config.json)"`

## Todo

- Create an ERD for the different models and relationships
- Refactor into a monorepo so I can deploy react native code to web
- Finish setting up Multisite for prod
- Create [GitHub Action Firebase Workflow](https://medium.com/firebase-developers/the-comprehensive-guide-to-github-actions-and-firebase-hosting-818502d86c31)

## Notes

Will be hosted using Firebase. Simplest way to perform hosting, deployment, authentication, etc. Using authentication on a custom backend server just complicates everything. Firebase tokens expire after one hour, meaning you'd have to reauthenticate every. single. hour.

You can also access a MySQL server from within Firebase, so the default usage of firestore is not a major limitation.

Can host multiple sites in one hosting; https://firebase.google.com/docs/hosting/multisites

```SQL
/* https://gis.stackexchange.com/questions/356835/sorting-by-distance-in-mysql */

SELECT *
FROM locator
WHERE SQRT(POW(X(center) - 49.843317, 2) + POW(Y(center) - 24.026642, 2)) * 100 < radius
ORDER BY SQRT(POW(X(center) - 49.843317, 2) + POW(Y(center) - 24.026642, 2)) * 100


/* https://gis.stackexchange.com/questions/31628/find-features-within-given-coordinates-and-distance-using-mysql/356830#356830

The SQL statement that will find the closest 20 locations that are within a radius of 30 miles to the 78.3232, 65.3234 coordinate. It calculates the distance based on the latitude/longitude of that row and the target latitude/longitude, and then asks for only rows where the distance value is less than 30 miles, orders the whole query by distance, and limits it to 20 results. To search by kilometers instead of miles, replace 3959 with 6371. */

SELECT
    id, (
      3959 * acos (
      cos ( radians(78.3232) )
      * cos( radians( lat ) )
      * cos( radians( lng ) - radians(65.3234) )
      + sin ( radians(78.3232) )
      * sin( radians( lat ) )
    )
) AS distance
FROM markers
HAVING distance < 30
ORDER BY distance
LIMIT 0 , 20;

```

https://www.freecodecamp.org/news/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c/
https://losikov.medium.com/backend-api-server-development-with-node-js-from-scratch-to-production-fe3d3b860003

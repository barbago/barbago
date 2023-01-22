# todo

## upcoming features

- allow barbers to sign up
  - add email provider, fix facebook
- Find barber improvements, barber detail, checkout flow
  - let barbers customize page, add services, etc
  - let customers order barber
- implement search with query parameters
  - make search take a +- lat/lon
  - display current location on web map
- home page
- add messaging for edge cases

## refactoring

- organize google api keys / clientids for multiple environments???
  - fix certificates for multiple environments
  - https://docs.expo.dev/app-signing/app-credentials/
  - need sha-1 fingerprint for oauth client id in stage, prod
  - can i generate multiple fingerprints? one for each env?
  - SOLUTION: https://docs.expo.dev/build-reference/variants/
- relocate api to cloud run
- delete old profile pictures periodically or whenever updated
  - https://medium.com/google-developer-experts/automatically-delete-your-firebase-storage-files-from-firestore-with-cloud-functions-for-firebase-36542c39ba0d

## future todo

- update environment variables from local machine with a script https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28#create-or-update-a-repository-secret
- refactor messages to use realtime database

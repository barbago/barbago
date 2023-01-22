import { pubsub } from 'firebase-functions/v2';

// https://console.cloud.google.com/cloudpubsub/topic/detail/test?project=barbago-dev&tab=messages
// https://cloud.google.com/pubsub/docs/publisher
export const pubsubexample = pubsub.onMessagePublished(
  'test',
  (event) => {
    console.warn(event);
  },
);

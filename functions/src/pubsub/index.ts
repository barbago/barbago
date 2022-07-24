import { pubsub } from "firebase-functions";

// https://console.cloud.google.com/cloudpubsub/topic/detail/test?project=barbago-dev&tab=messages
// https://cloud.google.com/pubsub/docs/publisher
export const pubsubExample = pubsub.topic('test').onPublish((message, context) => {
  console.warn(message, context);
})

import Expo, { ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

// https://www.npmjs.com/package/expo-server-sdk
export const sendNotifications = async (
  messages: ExpoPushMessage[],
) => {
  const expo = new Expo();

  messages = messages.filter(({ to: tokens }) => {
    if (Array.isArray(tokens)) {
      return tokens.every((token) => Expo.isExpoPushToken(token));
    } else return Expo.isExpoPushToken(tokens);
  });

  const chunks = expo.chunkPushNotifications(messages);

  const tickets: (ExpoPushTicket & { id?: string })[] = [];

  for (let chunk of chunks) {
    try {
      tickets.push(...(await expo.sendPushNotificationsAsync(chunk)));
    } catch (err) {
      console.error(err);
    }
  }

  const receiptIds: string[] = [];
  for (let ticket of tickets) {
    if (ticket.id) receiptIds.push(ticket.id);
    else {
      console.error(ticket);
    }
  }

  // https://docs.expo.dev/push-notifications/sending-notifications/#individual-errors
  // todo: must handle errors correctly
  const receiptChunks =
    expo.chunkPushNotificationReceiptIds(receiptIds);

  for (let chunk of receiptChunks) {
    try {
      let start = new Date().getTime();

      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);

      console.warn(
        `getPushNotificationReceiptsAsync took ${
          (new Date().getTime() - start) / 1000
        }s`,
      );

      for (let receiptId in receipts) {
        let receipt = receipts[receiptId];
        if (receipt.status === 'ok') {
          console.log(receipt);
          continue;
        } else if (receipt.status === 'error') {
          console.error(receipt.message);
          console.error(receipt.details?.error);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
};

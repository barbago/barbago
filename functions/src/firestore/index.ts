import { firestore } from "firebase-functions";

export const reviewWritten = firestore.document('vendors/{vendorId}/reviews/{authorId}').onWrite((change, context) => {
  console.warn(change, context)
})

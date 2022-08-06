import { firestore } from 'firebase-functions/v1';
import { firestore as db } from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export const reviewWritten = firestore
  .document('vendors/{vendorId}/reviews/{authorId}')
  .onWrite(async ({ before, after }, context) => {
    const { vendorId } = context.params;

    const totalChange =
      (after.data()?.rating ?? 0) - (before.data()?.rating ?? 0);

    const countChange =
      before.exists === after.exists ? 0 : after.exists ? 1 : -1;

    await db()
      .doc(`vendors/${vendorId}`)
      .update({
        ratingTotal: FieldValue.increment(totalChange),
        ratingCount: FieldValue.increment(countChange),
      });
  });

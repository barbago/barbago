import { auth } from 'firebase-functions';
import { firestore as db } from 'firebase-admin';

const usersPath = 'users';

export const userCreated = auth
  .user()
  .onCreate(async (user, _context) => {
    const {
      uid,
      displayName: name,
      email,
      phoneNumber: phone,
      photoURL: photo,
    } = user;
    const fields = { uid, name, email, phone, photo };

    // todo: also create settings for user
    return await db()
      .collection(usersPath)
      .doc(user.uid)
      .create(fields);
  });

export const userDeleted = auth
  .user()
  .onDelete(async (user, _context) => {
    return await db().collection(usersPath).doc(user.uid).delete();
  });

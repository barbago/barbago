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
    const fields = {
      uid,
      name: name ?? 'New User',
      email,
      phone,
      photo:
        photo ??
        'https://firebasestorage.googleapis.com/v0/b/barbago-dev.appspot.com/o/shared%2Fno_avatar.png?alt=media&token=6ed32a24-0855-4030-b85e-dee2b214c5c3',
    };

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

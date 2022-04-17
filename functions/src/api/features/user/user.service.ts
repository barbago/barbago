import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (
  uid: string,
  email: string,
  name: string,
) => {
  const newUser = await prisma.user.upsert({
    where: { uid: uid },
    update: {},
    create: {
      uid: uid,
      email: email,
      name: name,
    },
  });
  return newUser;
};

export const createClient = async (user: User) => {
  const newClient = await prisma.client.upsert({
    where: { uid: user.uid },
    update: {},
    create: {
      uid: user.uid,
    },
  });
  return newClient;
};

export const createVendor = async (user: User) => {
  const newVendor = await prisma.vendor.upsert({
    where: { uid: user.uid },
    update: {},
    create: {
      uid: user.uid,
    },
  });
  return newVendor;
};

import { vendorCollection } from '../vendor/vendor.service';

const reviewPath = 'reviews';

export const deleteReview = async (
  vendorId: string,
  authorId: string,
) => {
  return await vendorCollection
    .doc(vendorId)
    .collection(reviewPath)
    .doc(authorId)
    .delete();
};

export const getVendorReviews = async (vendorId: string) => {
  return (
    await vendorCollection.doc(vendorId).collection(reviewPath).get()
  ).docs.map((doc) => doc.data());
};

export const getVendorReviewById = async (
  vendorId: string,
  authorId: string,
) => {
  return (
    await vendorCollection
      .doc(vendorId)
      .collection(reviewPath)
      .doc(authorId)
      .get()
  ).data();
};

export const createReview = async (
  vendorId: string,
  authorId: string,
  params: { [key: string]: any },
) => {
  await vendorCollection
    .doc(vendorId)
    .collection(reviewPath)
    .doc(authorId)
    .create(params);
  return params;
};

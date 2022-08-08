import { ReviewModel } from '../../types';
import { api } from './base.api';
import { vendorPath } from './vendor.api';

export const reviewPath = 'reviews';

// https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/
export const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<
      ReviewModel,
      Pick<ReviewModel, 'vendorId' | 'rating' | 'text'>
    >({
      query: (review) => ({
        url: `${vendorPath}/${review.vendorId}/${reviewPath}`,
        method: 'POST',
        body: review,
      }),
      invalidatesTags: (_res, _err, { vendorId }) => [
        'Review',
        { type: 'Vendor', id: vendorId },
      ],
    }),
    fetchReviewsByUid: builder.query<ReviewModel[], string>({
      query: (uid) => ({ url: `${vendorPath}/${uid}/${reviewPath}` }),
      providesTags: ['Review'],
    }),
    updateReview: builder.mutation<ReviewModel, ReviewModel>({
      query: (review) => ({
        url: `${vendorPath}/${review.vendorId}/${reviewPath}`,
        method: 'PATCH',
        body: review,
      }),
      invalidatesTags: (_res, _err, { vendorId }) => [
        'Review',
        { type: 'Vendor', id: vendorId },
      ],
    }),
    deleteReview: builder.mutation<ReviewModel, string>({
      query: (uid) => ({
        url: `${vendorPath}/${uid}/${reviewPath}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, vendorId) => [
        'Review',
        { type: 'Vendor', id: vendorId },
      ],
    }),
  }),
  overrideExisting: true,
});

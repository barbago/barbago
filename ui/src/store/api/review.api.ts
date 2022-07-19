import { ReviewModel } from '../../types';
import { api } from './base.api';
import { vendorPath } from './vendor.api';

export const reviewPath = 'reviews';

// https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/
export const reviewApi = api
  .enhanceEndpoints({ addTagTypes: ['Review'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createReview: builder.mutation<
        ReviewModel,
        Pick<ReviewModel, 'vendorId' | 'rating' | 'text'>
      >({
        query: (review) => ({
          url: `${vendorPath}/${review.vendorId}/${reviewPath}`,
          method: 'post',
          body: review,
        }),
        invalidatesTags: ['Review'],
      }),
      fetchReviewsByUid: builder.query<ReviewModel[], string>({
        query: (uid) => ({ url: `${vendorPath}/${uid}/${reviewPath}` }),
        providesTags: ['Review'],
      }),
      updateReview: builder.mutation<ReviewModel, ReviewModel>({
        query: (review) => ({
          url: `${vendorPath}/${review.vendorId}/${reviewPath}`,
          method: 'put',
          body: review,
        }),
        invalidatesTags: ['Review'],
      }),
      deleteReview: builder.mutation<ReviewModel, string>({
        query: (uid) => ({
          url: `${vendorPath}/${uid}/${reviewPath}`,
          method: 'delete',
        }),
        invalidatesTags: ['Review'],
      }),
    }),
    overrideExisting: true,
  });

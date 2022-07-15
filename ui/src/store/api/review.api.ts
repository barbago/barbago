import { ReviewModel } from '../../types';
import { api } from './base.api';
import { exampleReviews } from './review.example';

const path = 'review';

// https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/
export const reviewApi = api
  .enhanceEndpoints({ addTagTypes: ['Review'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createReview: builder.mutation<
        ReviewModel,
        Pick<ReviewModel, 'uid' | 'rating' | 'review'>
      >({
        // query: (review) => ({
        //   url: `${path}/${review.uid}`,
        //   method: 'post',
        //   body: review,
        // }),
        queryFn: (review) => {
          exampleReviews.push({
            ...review,
            date: new Date().toISOString(),
          });
          return { data: review };
        },
        invalidatesTags: ['Review'],
      }),
      fetchReviewsByUid: builder.query<ReviewModel[], string>({
        // query: (uid) => ({ url: `${path}/${uid}` }),
        queryFn: (uid) => ({
          data: exampleReviews.filter((review) => review.uid === uid),
        }),
        providesTags: ['Review'],
      }),
      updateReview: builder.mutation<ReviewModel, ReviewModel>({
        query: (params) => ({
          url: `${path}/${params.uid}`,
          method: 'put',
          body: params,
        }),
        invalidatesTags: ['Review'],
      }),
      deleteReview: builder.mutation<ReviewModel, string>({
        query: (uid) => ({ url: `${path}/${uid}`, method: 'delete' }),
        invalidatesTags: ['Review'],
      }),
      reportReview: builder.query<any, any>({
        query: (params) => ({
          url: `${path}/${params.uid}/report`,
          method: 'post',
          body: params,
        }),
      }),
    }),
    overrideExisting: true,
  });

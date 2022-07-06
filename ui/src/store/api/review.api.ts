import { ReviewModel } from '../../types';
import { api } from './base.api';
import { exampleReviews } from './review.example';

const path = 'review';

// https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/
export const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<
      ReviewModel,
      ReviewModel & { uid: string }
    >({
      // query: (params) => ({
      //   url: `${path}/${params.uid}`,
      //   method: 'post',
      //   body: params
      // })
      queryFn: (params) => ({ data: params }),
    }),
    fetchReviewsByUid: builder.query<ReviewModel[], string>({
      // query: ({uid, limit = 10, offset = 0}) => ({url: `${path}/${uid}?limit=${limit}&offset=${offset}`}),
      // query: (uid) => ({ url: `${path}/${uid}`}),
      queryFn: (uid) => ({
        data: exampleReviews.filter((review) => review.uid === uid),
      }),
    }),
    // deleteReview: builder.mutation({
    //   queryFn: (uid) => {
    //     const vendor = exampleVendors.find(
    //       (vendor) => vendor.uid === uid,
    //     );
    //     return vendor
    //       ? { data: vendor }
    //       : { error: { status: 404, data: undefined } };
    //   },
    // }),
  }),
  overrideExisting: false,
});

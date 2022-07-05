import { ReviewModel } from '../../types';
import { api } from './base.api';

const path = 'review';

const exampleReviews: ReviewModel[] = [
  {
    uid: '1',
    date: '2022-07-04T20:00:00.000Z',
    rating: 1,
    review:
      "Hated this place, won't come back. Hated this place, won't come back. Hated this place, won't come back. Hated this place, won't come back. Hated this place, won't come back. Hated this place, won't come back. Hated this place, won't come back.",
  },
  {
    uid: '1',
    name: 'Johnson',
    location: 'Northland NC',
    review: "Hated this place, won't come back",
    rating: 3,
    date: '2022-12-31',
  },
  {
    uid: '1',
    name: 'Alexander',
    location: 'Cary NC',
    review: 'Dont even like barbers',
    rating: 4,
    date: new Date().toISOString(),
  },
];

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

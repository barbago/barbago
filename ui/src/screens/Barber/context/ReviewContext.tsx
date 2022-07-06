import {
  createContext,
  FC,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Text } from '../../../components';
import { reviewApi } from '../../../store';
import { ReviewModel } from '../../../types';
import { useVendor } from './VendorContext';

export interface ReviewState {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  response: ReturnType<typeof reviewApi.useFetchReviewsByUidQuery>;
  reviews: ReviewModel[];
  average: number;
}

export const ReviewContext = createContext<ReviewState>(undefined!);

export const useReview = () => useContext(ReviewContext);

export const ReviewService: FC = ({ children }) => {
  console.log('rendering context');

  const { vendorUid } = useVendor();
  const response = reviewApi.useFetchReviewsByUidQuery(vendorUid);

  const reviews = response.data ?? [];

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const average = useMemo(
    () =>
      reviews.reduce((prev, curr) => (curr.rating ?? 0) + prev, 0) /
      reviews.filter(({ rating }) => rating).length,
    [reviews],
  );

  const reviewService: ReviewState = {
    average,
    page,
    setPage,
    limit,
    setLimit,
    response,
    reviews,
  };

  return (
    <ReviewContext.Provider value={reviewService}>
      {response.isLoading ? <Text>Loading Reviews...</Text> : children}
    </ReviewContext.Provider>
  );
};

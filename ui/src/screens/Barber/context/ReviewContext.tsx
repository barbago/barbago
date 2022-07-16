import {
  createContext,
  FC,
  useContext,
  useEffect,
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
  createReview: ReturnType<typeof reviewApi.useCreateReviewMutation>[0];
  response: ReturnType<typeof reviewApi.useFetchReviewsByUidQuery>;
  reviews: ReviewModel[];
  displayed: ReviewModel[];
  average: number;
  sort: ReviewSort;
  setSort: (sort: ReviewSort) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

interface ReviewSort {
  key: keyof ReviewModel;
  asc: boolean;
}

export const ReviewContext = createContext<ReviewState>(undefined!);

export const useReview = () => useContext(ReviewContext);

export const ReviewService: FC = ({ children }) => {
  const { vendorUid } = useVendor();
  const response = reviewApi.useFetchReviewsByUidQuery(vendorUid);
  const [createReview] =
    reviewApi.useCreateReviewMutation();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState<string>('');
  const [sort, setSort] = useState<ReviewSort>({
    key: 'date',
    asc: false,
  });


  const reviews = response.data ?? [];

  const displayed = useMemo(() => {
    const arr = reviews
      .filter((review) =>
        Object.values(review).some((value) =>
          value.toString().toLowerCase().includes(filter.toLowerCase()),
        ),
      )
      .sort(({ [sort.key]: a }, { [sort.key]: b }) =>
        !!a && !!b ? b!.toString().localeCompare(a.toString()) : 0,
      );
    return sort.asc ? arr.reverse() : arr;
  }, [reviews, filter, sort]);

  const average = useMemo(
    () =>
      reviews.reduce((prev, curr) => (curr.rating ?? 0) + prev, 0) /
      reviews.filter(({ rating }) => rating).length,
    [reviews],
  );

  useEffect(() => {
    setPage(0);
  }, [displayed]);

  const reviewService: ReviewState = {
    average,
    page,
    setPage,
    limit,
    setLimit,
    createReview,
    response,
    reviews,
    displayed,
    sort,
    setSort,
    filter,
    setFilter,
  };

  return (
    <ReviewContext.Provider value={reviewService}>
      {response.isLoading ? <Text>Loading Reviews...</Text> : children}
    </ReviewContext.Provider>
  );
};

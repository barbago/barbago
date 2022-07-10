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
  response: ReturnType<typeof reviewApi.useFetchReviewsByUidQuery>;
  reviews: ReviewModel[];
  displayed: ReviewModel[];
  average: number;
  sort: keyof ReviewModel;
  setSort: (sort: keyof ReviewModel) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export const ReviewContext = createContext<ReviewState>(undefined!);

export const useReview = () => useContext(ReviewContext);

export const ReviewService: FC = ({ children }) => {
  const { vendorUid } = useVendor();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState<keyof ReviewModel>('date');
  const [filter, setFilter] = useState<string>('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const response = reviewApi.useFetchReviewsByUidQuery(vendorUid);

  const reviews = response.data ?? [];

  const displayed = useMemo(() => {
    const arr = reviews
      .filter((review) =>
        Object.values(review).some((value) =>
          value.toString().toLowerCase().includes(filter.toLowerCase()),
        ),
      )
      .sort((a, b) =>
        !!a[sort] && !!b[sort]
          ? b[sort]!.toString().localeCompare(a[sort]!.toString())
          : 0,
      );
    return !sortAsc ? arr : arr.reverse();
  }, [reviews, filter, sort, sortAsc]);

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

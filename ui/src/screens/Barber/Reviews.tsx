import React from 'react';
import { ReviewSection } from './components/Review/ReviewSection';
import { ReviewService } from './context/ReviewContext';

export const Reviews = () => {
  return (
    <ReviewService>
      <ReviewSection />
    </ReviewService>
  );
};

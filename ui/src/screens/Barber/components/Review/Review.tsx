import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Menu } from 'react-native-paper';

import { Text } from '../../../../components';
import { useAuth } from '../../../../providers';
import { reviewApi } from '../../../../store';
import { ReviewModel } from '../../../../types';
import { relativeTimeFromDates } from '../../../../utils';
import { Stars } from './Stars';

export interface ReviewProps {
  review: ReviewModel;
}

export const Review = ({ review }: ReviewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!!review.avatar && (
          <Image
            style={styles.avatar}
            source={{ uri: review.avatar }}
          />
        )}
        <View style={styles.author}>
          <Text>{review.name}</Text>
          {!!review.location && (
            <Text style={styles.secondary}>{review.location}</Text>
          )}
        </View>
        <ReviewMenu review={review} />
      </View>
      <View style={styles.rating}>
        {!!review.rating && (
          <Stars rating={review.rating} style={styles.stars} />
        )}
        {!!review.date && (
          <Text style={styles.secondary}>
            {relativeTimeFromDates(new Date(review.date ?? ''))}
          </Text>
        )}
      </View>
      <Text style={styles.content}>{review.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 12.5,
  },
  author: {
    flexGrow: 1,
  },
  kebab: {
    width: 25,
    height: 25,
    textAlign: 'center',
    opacity: 0.5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stars: {
    marginRight: 4,
  },
  secondary: {
    opacity: 0.75,
  },
  content: {},
});

const ReviewMenu = ({ review }: { review: ReviewModel }) => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [deleteReview] = reviewApi.useDeleteReviewMutation();

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Pressable
          style={styles.kebab}
          onPress={() => setVisible(true)}
        >
          <Text style={{ lineHeight: 25 }}>⋮</Text>
        </Pressable>
      }
    >
      <Menu.Item
        title="Report Review"
        onPress={() => alert('reporting review!')}
      />
      {user?.uid === review.authorId && (
        <Menu.Item
          title="Delete Review"
          onPress={() => deleteReview(review.vendorId)}
        />
      )}
    </Menu>
  );
};

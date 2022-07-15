import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Menu } from 'react-native-paper';

import { Text } from '../../../../components';
import { ReviewModel } from '../../../../types';
import { relativeTimeFromDates } from '../../../../utils';
import { Stars } from './Stars';

export interface ReviewProps {
  review: ReviewModel;
}

export const Review = ({
  review: {
    name = 'Anonymous Reviewer',
    location,
    avatar = 'https://source.unsplash.com/featured?haircut,barber',
    date,
    rating,
    review = 'This place is so underrated and not enough people are talking about it! Found this place randomly looking on Yelp and so happy I stumbled upon it',
  },
}: ReviewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!!avatar && (
          <Image style={styles.avatar} source={{ uri: avatar }} />
        )}
        <View style={styles.author}>
          <Text>{name}</Text>
          {!!location && (
            <Text style={styles.secondary}>{location}</Text>
          )}
        </View>
        <ReviewMenu />
      </View>
      <View style={styles.rating}>
        {!!rating && <Stars rating={rating} style={styles.stars} />}
        {!!date && (
          <Text style={styles.secondary}>
            {relativeTimeFromDates(new Date(date ?? ''))}
          </Text>
        )}
      </View>
      <Text style={styles.content}>{review}</Text>
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

const ReviewMenu = () => {
  const [visible, setVisible] = useState(false);
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
    </Menu>
  );
};

import { ImageSourcePropType } from "react-native";

export const data: SlideItem[] = [
  {
    image: require('../../assets/images/undraw_barber.png'),
    title: 'Welcome!',
    text: 'Barbago is the platform for finding the best and most convenient barber around.',
  },
  {
    image: require('../../assets/images/undraw_location.png'),
    title: 'Get the Best Cut',
    text: 'Set up appointments with any barber or have them come directly to your home!',
  },
  {
    image: require('../../assets/images/undraw_home.png'),
    title: 'Simple as that!',
    text: "Now let's get started!",
  },
];

export interface SlideItem {
  image: ImageSourcePropType;
  title?: string;
  text?: string;
}

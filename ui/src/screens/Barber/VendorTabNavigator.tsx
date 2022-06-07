import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { windowHeight } from '../../config';
import { VendorTabParamList } from '../../navigation';
import {
  BarberInfoPage,
  BarberReviewPage,
  BarberServicePage,
} from './screens';

const Tab = createMaterialTopTabNavigator<VendorTabParamList>();

export function VendorTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Info"
      style={{ height: windowHeight - 112 }}
      // style={{ flex: 1 }}
    >
      <Tab.Screen name="Info" component={BarberInfoPage} />
      <Tab.Screen name="Services" component={BarberServicePage} />
      <Tab.Screen name="Reviews" component={BarberReviewPage} />
    </Tab.Navigator>
  );
}

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { VendorTabParamList } from '../../navigation';
import {
  BarberImagePage,
  BarberInfoPage,
  BarberReviewPage,
  BarberServicePage,
} from './screens';

const Tab = createMaterialTopTabNavigator<VendorTabParamList>();

export function VendorTabs() {
  return (
    <Tab.Navigator initialRouteName="Info" >
      <Tab.Screen name="Info" component={BarberInfoPage} />
      <Tab.Screen name="Services" component={BarberServicePage} />
      <Tab.Screen name="Reviews" component={BarberReviewPage} />
      <Tab.Screen name="Images" component={BarberImagePage} />
    </Tab.Navigator>
  );
}

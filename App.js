import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

import Home from './screens/home.screen';
import Gallery from './screens/gallery.screen';
import Profile from './screens/profile.screen';

import HomeIcon from './components/icons/home-icon';
import GalleryIcon from './components/icons/gallery-icon';
import ProfileIcon from './components/icons/profile-icon';

import NewsDetails from './components/news/news.component';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const StackRoute = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ title: 'Новини' }} />
    <Stack.Screen
      name="NewsDetails"
      component={NewsDetails}
      options={{ title: 'Про новини' }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <>
      <Header />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Головна"
            component={StackRoute}
            options={{
              tabBarIcon: HomeIcon,
            }}
          />
          <Tab.Screen
            name="Галерея"
            component={Gallery}
            options={{
              tabBarIcon: GalleryIcon,
            }}
          />
          <Tab.Screen
            name="Профіль"
            component={Profile}
            options={{
              tabBarIcon: ProfileIcon,
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
      <Footer />
    </>
  );
}

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Words from './screens/Words';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import CameraScreen from './screens/CameraScreen';
import TraductionScreen from './screens/TraductionScreen';
import DetailedTraductionScreen from './screens/DetailedTraductionScreen';
import AboutScreen from './screens/AboutScreen';
import VersionScreen from './screens/VersionScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Tab.Navigator
      activeColor="#f6edee"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          tabBarLabel : 'Letters',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="alphabetical" color={color} size={26} />
          ),
        }}
        />

        <Tab.Screen name="Detection" component={CameraScreen}
        options={{
          tabBarLabel : 'Detection',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
          ),
        }}
        />

        

        <Tab.Screen name="Traduction" component={TraductionScreen}
        options={{
          tabBarLabel : 'Traduction',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="translate" color={color} size={26} />
          ),
        }}
        />

        <Tab.Screen name="Information" component={AboutScreen}
        options={{
          tabBarLabel : 'Me',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="information" color={color} size={26} />
          ),
        }}
        />
        
    </Tab.Navigator>
  );
}

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home1'
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Detailed'
          component={DetailedTraductionScreen}
        />
        <Stack.Screen
          name='Version'
          component={VersionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
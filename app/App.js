// import { useEffect } from "react";
// import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { enableScreens } from "react-native-screens";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { MonitoringScreen } from "./src/screens/MonitoringScreen.js";
// import { ControlScreen } from "./src/screens/ControlScreen.js";
// import { assertConfig } from "./src/services/config.js";

// const Tab = createBottomTabNavigator();

// enableScreens(true);

// export default function App() {
//   useEffect(() => {
//     assertConfig();
//   }, []);

//   const theme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       background: "#f8f9fb",
//     },
//   };

//   return (
//     <SafeAreaProvider>
//       <NavigationContainer theme={theme}>
//         <Tab.Navigator
//           screenOptions={({ route }) => ({
//             headerShown: true,
//             headerTitle: "IOTWatch",
//             headerTitleAlign: "center",
//             headerTintColor: "#1f2937",
//             headerStyle: { backgroundColor: "#f8f9fb" },
//             headerTitleStyle: { fontWeight: "600", fontSize: 18 },
//             tabBarActiveTintColor: "#2563eb",
//             tabBarInactiveTintColor: "#94a3b8",
//             tabBarIcon: ({ color, size }) => {
//               const iconName = route.name === "Monitoring" ? "analytics" : "options";
//               return <Ionicons name={iconName} size={size} color={color} />;
//             },
//           })}
//         >
//           <Tab.Screen name="Monitoring" component={MonitoringScreen} />
//           <Tab.Screen name="Control" component={ControlScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>  
//     </SafeAreaProvider>
//   );
// }

// import React, { useState, useEffect, useCallback } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { MaterialIcons } from '@expo/vector-icons';
// import { View } from 'react-native';
// import * as Font from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';

// // Context
// import { AuthProvider, useAuth } from './src/context/AuthContext';

// // Screens
// import CustomSplashScreen from './src/screens/SplashScreen';
// import LoginScreen from './src/screens/LoginScreen';
// import MonitoringScreen from './src/screens/MonitoringScreen';
// import ControlScreen from './src/screens/ControlScreen';
// import ProfileScreen from './src/screens/ProfileScreen';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // Keep splash screen visible while loading
// SplashScreen.preventAutoHideAsync();

// function MainTabs() {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Monitoring') {
//             iconName = 'analytics';
//           } else if (route.name === 'Control') {
//             iconName = 'tune';
//           } else if (route.name === 'Profile') {
//             iconName = 'person';
//           }

//           return <MaterialIcons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#007AFF',
//         tabBarInactiveTintColor: '#8E8E93',
//         tabBarStyle: {
//           backgroundColor: '#fff',
//           borderTopWidth: 1,
//           borderTopColor: '#e0e0e0',
//           paddingBottom: 5,
//           paddingTop: 5,
//           height: 60,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: '600',
//         },
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen
//         name="Monitoring"
//         component={MonitoringScreen}
//         options={{
//           tabBarLabel: 'Monitoring',
//         }}
//       />
//       <Tab.Screen
//         name="Control"
//         component={ControlScreen}
//         options={{
//           tabBarLabel: 'Control',
//           tabBarBadge: !isAuthenticated() ? '!' : null,
//           tabBarBadgeStyle: {
//             backgroundColor: '#f44336',
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarLabel: 'Profile',
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// function AppNavigator() {
//   const [showSplash, setShowSplash] = useState(true);

//   const handleSplashFinish = () => {
//     setShowSplash(false);
//   };

//   if (showSplash) {
//     return <CustomSplashScreen onFinish={handleSplashFinish} />;
//   }

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="MainApp" component={MainTabs} />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function prepare() {
//       try {
//         // Load fonts
//         await Font.loadAsync({
//           ...MaterialIcons.font,
//         });

//         // Artificial delay for splash screen (optional)
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       await SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return null;
//   }

//   return (
//     <AuthProvider>
//       <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//         <NavigationContainer>
//           <AppNavigator />
//         </NavigationContainer>
//       </View>
//     </AuthProvider>
//   );
// }

import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Context
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Screens
import CustomSplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MonitoringScreen from './src/screens/MonitoringScreen';
import ControlScreen from './src/screens/ControlScreen'; // Default import
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

function MainTabs() {
  const { isAuthenticated } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Monitoring') {
            iconName = 'analytics';
          } else if (route.name === 'Control') {
            iconName = 'tune';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Monitoring"
        component={MonitoringScreen}
        options={{
          tabBarLabel: 'Monitoring',
        }}
      />
      <Tab.Screen
        name="Control"
        component={ControlScreen}
        options={{
          tabBarLabel: 'Control',
          tabBarBadge: !isAuthenticated() ? '!' : null,
          tabBarBadgeStyle: {
            backgroundColor: '#f44336',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <CustomSplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainApp" component={MainTabs} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...MaterialIcons.font,
        });

        // Artificial delay for splash screen (optional)
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </View>
    </AuthProvider>
  );
}
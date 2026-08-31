import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? '#121212' : '#FFFFFF',
          },
          headerTintColor: isDark ? '#FFFFFF' : '#111111',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="Profile"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <ProfileScreen
              {...props}
              isDark={isDark}
              setIsDark={setIsDark}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="EditProfile"
          options={{
            title: 'Editar perfil',
          }}
        >
          {(props) => (
            <EditProfileScreen
              {...props}
              isDark={isDark}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
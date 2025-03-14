import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';

// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';

// Stack-Navigator erstellen
const Stack = createNativeStackNavigator();

// Auth-Stack (nicht angemeldet)
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

// App-Stack (angemeldet)
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Meine Notizen' }} 
      />
      <Stack.Screen 
        name="Scan" 
        component={ScanScreen} 
        options={{ title: 'Notiz scannen' }} 
      />
      <Stack.Screen 
        name="NoteDetail" 
        component={NoteDetailScreen} 
        options={{ title: 'Notiz Details' }} 
      />
    </Stack.Navigator>
  );
};

// Haupt-Navigator
const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  // Wenn noch geladen wird, könnte hier ein Ladebildschirm angezeigt werden
  if (loading) {
    return null; // Oder einen Ladebildschirm anzeigen
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator; 
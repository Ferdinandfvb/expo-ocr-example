import "expo-dev-client";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { initializeFirebase } from "./src/services/firebase";
import { AuthProvider } from "./src/hooks/useAuth";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

// NativeWind für Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";

// Tailwind-Styles für Web initialisieren
NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  // Firebase beim App-Start initialisieren
  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';

const LoginScreen = () => {
  const { login, loading } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login fehlgeschlagen:', error);
      // Hier könnte ein Fehlerhinweis angezeigt werden
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-8">
      <View className="items-center mb-12">
        <Image 
          source={require('../../assets/icon.png')} 
          className="w-24 h-24 mb-4"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-blue-600 mb-2">Schulnotiz</Text>
        <Text className="text-lg text-gray-600 text-center">
          Organisieren Sie Ihre Schulnotizen mit OCR-Technologie
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleGoogleLogin}
        disabled={loading}
        className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 flex-row justify-center items-center"
      >
        {loading ? (
          <ActivityIndicator size="small" color="#4285F4" />
        ) : (
          <>
            <Image
              source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
              className="w-6 h-6 mr-3"
              resizeMode="contain"
            />
            <Text className="text-gray-700 font-semibold text-base">
              Mit Google anmelden
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen; 
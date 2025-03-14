import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { saveNote } from '../services/firebase';
import OcrModule from '../../modules/ocr-module';

const ScanScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

  // Berechtigungen für Kamera und Mediathek anfordern
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
        Alert.alert(
          'Berechtigungen erforderlich',
          'Für diese App werden Kamera- und Mediathekberechtigungen benötigt.'
        );
      }
    })();
  }, []);

  // Bild aus der Kamera aufnehmen
  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled) {
        processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Fehler beim Aufnehmen des Fotos:', error);
      Alert.alert('Fehler', 'Das Foto konnte nicht aufgenommen werden.');
    }
  };

  // Bild aus der Mediathek auswählen
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled) {
        processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Fehler beim Auswählen des Bildes:', error);
      Alert.alert('Fehler', 'Das Bild konnte nicht ausgewählt werden.');
    }
  };

  // Bild verarbeiten und für OCR vorbereiten
  const processImage = async (uri) => {
    try {
      setImage(uri);
      
      // Bild in den Cache-Ordner kopieren
      const fileName = uri.split('/').pop();
      const cachePath = FileSystem.cacheDirectory + fileName;
      await FileSystem.copyAsync({ from: uri, to: cachePath });
      
      setImageUri(cachePath);
    } catch (error) {
      console.error('Fehler bei der Bildverarbeitung:', error);
      Alert.alert('Fehler', 'Das Bild konnte nicht verarbeitet werden.');
    }
  };

  // Text aus dem Bild erkennen
  const recognizeText = async () => {
    if (!imageUri) return;
    
    try {
      setScanning(true);
      const text = await OcrModule.recognizeTextAsync(imageUri);
      setRecognizedText(text);
      
      // Automatisch einen Titel aus den ersten Worten generieren
      if (text && !title) {
        const words = text.split(' ');
        const autoTitle = words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : '');
        setTitle(autoTitle);
      }
    } catch (error) {
      console.error('Fehler bei der Texterkennung:', error);
      Alert.alert('Fehler', 'Der Text konnte nicht erkannt werden.');
    } finally {
      setScanning(false);
    }
  };

  // Notiz speichern
  const handleSave = async () => {
    if (!recognizedText) {
      Alert.alert('Fehler', 'Bitte scannen Sie zuerst ein Bild.');
      return;
    }

    try {
      setLoading(true);
      
      // Notiz in Firestore speichern
      await saveNote({
        title: title || 'Unbenannte Notiz',
        text: recognizedText,
        imageUri: image, // Original-URI des Bildes
      });
      
      Alert.alert(
        'Erfolg',
        'Die Notiz wurde erfolgreich gespeichert.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Fehler beim Speichern der Notiz:', error);
      Alert.alert('Fehler', 'Die Notiz konnte nicht gespeichert werden.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {!image ? (
          <View className="h-60 bg-gray-100 rounded-lg justify-center items-center mb-4">
            <Ionicons name="image-outline" size={64} color="#CCCCCC" />
            <Text className="text-gray-500 mt-2">Kein Bild ausgewählt</Text>
          </View>
        ) : (
          <View className="mb-4">
            <Image
              source={{ uri: image }}
              className="h-60 w-full rounded-lg"
              resizeMode="cover"
            />
            {scanning && (
              <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center rounded-lg">
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text className="text-white mt-2">Texterkennung läuft...</Text>
              </View>
            )}
          </View>
        )}

        <View className="flex-row justify-center mb-6">
          <TouchableOpacity
            className="bg-blue-600 rounded-full p-3 mx-2"
            onPress={takePhoto}
            disabled={scanning || loading}
          >
            <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-600 rounded-full p-3 mx-2"
            onPress={pickImage}
            disabled={scanning || loading}
          >
            <Ionicons name="image-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {image && (
            <TouchableOpacity
              className="bg-green-600 rounded-full p-3 mx-2"
              onPress={recognizeText}
              disabled={!imageUri || scanning || loading}
            >
              <Ionicons name="scan-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>

        {recognizedText ? (
          <>
            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-1">Titel</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white"
                value={title}
                onChangeText={setTitle}
                placeholder="Titel der Notiz"
              />
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-1">Erkannter Text</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white min-h-[150px]"
                value={recognizedText}
                onChangeText={setRecognizedText}
                placeholder="Erkannter Text"
                multiline
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              className="bg-blue-600 py-3 px-4 rounded-lg items-center"
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text className="text-white font-semibold text-base">Notiz speichern</Text>
              )}
            </TouchableOpacity>
          </>
        ) : image ? (
          <Text className="text-center text-gray-600">
            Drücken Sie auf den Scan-Button, um den Text zu erkennen.
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default ScanScreen; 
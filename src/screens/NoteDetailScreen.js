import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { saveNote } from '../services/firebase';

const NoteDetailScreen = ({ route, navigation }) => {
  const { note } = route.params;
  const [title, setTitle] = useState(note.title || 'Unbenannte Notiz');
  const [text, setText] = useState(note.text || '');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Notiz speichern
  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Notiz in Firestore aktualisieren
      await saveNote({
        id: note.id,
        title,
        text,
        imageUri: note.imageUri,
      });
      
      setIsEditing(false);
      Alert.alert('Erfolg', 'Die Notiz wurde erfolgreich aktualisiert.');
    } catch (error) {
      console.error('Fehler beim Speichern der Notiz:', error);
      Alert.alert('Fehler', 'Die Notiz konnte nicht gespeichert werden.');
    } finally {
      setLoading(false);
    }
  };

  // Bearbeitungsmodus umschalten
  const toggleEditMode = () => {
    if (isEditing) {
      // Wenn wir den Bearbeitungsmodus verlassen, fragen wir, ob gespeichert werden soll
      Alert.alert(
        'Änderungen speichern?',
        'Möchten Sie Ihre Änderungen speichern?',
        [
          { 
            text: 'Abbrechen', 
            style: 'cancel',
            onPress: () => {
              // Änderungen verwerfen und zum ursprünglichen Zustand zurückkehren
              setTitle(note.title || 'Unbenannte Notiz');
              setText(note.text || '');
              setIsEditing(false);
            }
          },
          { 
            text: 'Speichern', 
            onPress: handleSave 
          },
        ]
      );
    } else {
      // Bearbeitungsmodus aktivieren
      setIsEditing(true);
    }
  };

  // Datum formatieren
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unbekanntes Datum';
    
    const date = new Date(timestamp.toDate());
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {note.imageUri && (
          <Image
            source={{ uri: note.imageUri }}
            className="h-48 w-full rounded-lg mb-4"
            resizeMode="cover"
          />
        )}

        <View className="mb-4">
          <Text className="text-gray-700 font-semibold mb-1">Titel</Text>
          {isEditing ? (
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              value={title}
              onChangeText={setTitle}
              placeholder="Titel der Notiz"
            />
          ) : (
            <Text className="text-xl font-bold">{title}</Text>
          )}
        </View>

        <View className="mb-2">
          <Text className="text-gray-500 text-xs">
            Erstellt am: {formatDate(note.createdAt)}
          </Text>
          {note.updatedAt && note.updatedAt !== note.createdAt && (
            <Text className="text-gray-500 text-xs">
              Zuletzt bearbeitet: {formatDate(note.updatedAt)}
            </Text>
          )}
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-1">Inhalt</Text>
          {isEditing ? (
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white min-h-[200px]"
              value={text}
              onChangeText={setText}
              placeholder="Inhalt der Notiz"
              multiline
              textAlignVertical="top"
            />
          ) : (
            <Text className="text-base leading-6">{text}</Text>
          )}
        </View>

        <TouchableOpacity
          className={`py-3 px-4 rounded-lg items-center flex-row justify-center ${
            isEditing ? 'bg-green-600' : 'bg-blue-600'
          }`}
          onPress={toggleEditMode}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons 
                name={isEditing ? 'save-outline' : 'create-outline'} 
                size={20} 
                color="#FFFFFF" 
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-semibold text-base">
                {isEditing ? 'Speichern' : 'Bearbeiten'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NoteDetailScreen; 
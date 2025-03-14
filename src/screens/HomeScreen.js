import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { getUserNotes, deleteNote } from '../services/firebase';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Notizen laden
  const loadNotes = async () => {
    try {
      setLoading(true);
      const userNotes = await getUserNotes();
      setNotes(userNotes);
    } catch (error) {
      console.error('Fehler beim Laden der Notizen:', error);
      Alert.alert('Fehler', 'Die Notizen konnten nicht geladen werden.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Notizen beim ersten Laden und bei Fokus auf den Bildschirm laden
  useEffect(() => {
    loadNotes();

    // Listener für Fokus auf den Bildschirm
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotes();
    });

    return unsubscribe;
  }, [navigation]);

  // Notiz löschen
  const handleDeleteNote = (noteId) => {
    Alert.alert(
      'Notiz löschen',
      'Möchten Sie diese Notiz wirklich löschen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { 
          text: 'Löschen', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteNote(noteId);
              setNotes(notes.filter(note => note.id !== noteId));
            } catch (error) {
              console.error('Fehler beim Löschen der Notiz:', error);
              Alert.alert('Fehler', 'Die Notiz konnte nicht gelöscht werden.');
            }
          }
        },
      ]
    );
  };

  // Notiz-Element rendern
  const renderNoteItem = ({ item }) => {
    const date = item.createdAt ? new Date(item.createdAt.toDate()) : new Date();
    const formattedDate = date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return (
      <TouchableOpacity
        className="bg-white p-4 rounded-lg mb-3 shadow-sm border border-gray-100"
        onPress={() => navigation.navigate('NoteDetail', { note: item })}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-2">
            <Text className="text-lg font-semibold mb-1" numberOfLines={1}>
              {item.title || 'Unbenannte Notiz'}
            </Text>
            <Text className="text-gray-600 mb-2" numberOfLines={2}>
              {item.text || 'Kein Text'}
            </Text>
            <Text className="text-xs text-gray-500">
              {formattedDate}
            </Text>
          </View>
          <TouchableOpacity
            className="p-2"
            onPress={() => handleDeleteNote(item.id)}
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4 flex-row justify-between items-center bg-white border-b border-gray-200">
        <View>
          <Text className="text-sm text-gray-500">Angemeldet als</Text>
          <Text className="font-semibold">{user?.email || 'Unbekannter Benutzer'}</Text>
        </View>
        <TouchableOpacity
          className="p-2"
          onPress={logout}
        >
          <Ionicons name="log-out-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 p-4">
        {loading && !refreshing ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : notes.length > 0 ? (
          <FlatList
            data={notes}
            renderItem={renderNoteItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadNotes();
            }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Ionicons name="document-text-outline" size={64} color="#CCCCCC" />
            <Text className="text-gray-500 mt-4 text-center">
              Keine Notizen vorhanden. Scannen Sie Ihre erste Notiz!
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 w-16 h-16 rounded-full justify-center items-center shadow-lg"
        onPress={() => navigation.navigate('Scan')}
      >
        <Ionicons name="scan-outline" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen; 
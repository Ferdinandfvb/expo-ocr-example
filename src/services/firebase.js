import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG, GOOGLE_AUTH_CONFIG } from '../config/firebase';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Firebase initialisieren
export const initializeFirebase = () => {
  // Firebase App initialisieren
  initializeApp(FIREBASE_CONFIG);
  
  // Google Sign-In konfigurieren
  GoogleSignin.configure(GOOGLE_AUTH_CONFIG);
};

// Google-Anmeldung
export const signInWithGoogle = async () => {
  try {
    // Google Sign-In Flow starten
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    
    // Firebase-Anmeldeinformationen erstellen
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
    // Mit Firebase anmelden
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error('Google Sign-In Fehler:', error);
    throw error;
  }
};

// Abmelden
export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    return auth().signOut();
  } catch (error) {
    console.error('Abmelde-Fehler:', error);
    throw error;
  }
};

// Aktuellen Benutzer abrufen
export const getCurrentUser = () => {
  return auth().currentUser;
};

// Notizen-Sammlung
const notesCollection = 'notes';

// Notiz speichern
export const saveNote = async (note) => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('Benutzer nicht angemeldet');
    
    const noteData = {
      ...note,
      userId: user.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };
    
    if (note.id) {
      // Bestehende Notiz aktualisieren
      await firestore()
        .collection(notesCollection)
        .doc(note.id)
        .update({
          ...noteData,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      return note.id;
    } else {
      // Neue Notiz erstellen
      const docRef = await firestore()
        .collection(notesCollection)
        .add(noteData);
      return docRef.id;
    }
  } catch (error) {
    console.error('Fehler beim Speichern der Notiz:', error);
    throw error;
  }
};

// Notizen für den aktuellen Benutzer abrufen
export const getUserNotes = async () => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('Benutzer nicht angemeldet');
    
    const snapshot = await firestore()
      .collection(notesCollection)
      .where('userId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Fehler beim Abrufen der Notizen:', error);
    throw error;
  }
};

// Notiz löschen
export const deleteNote = async (noteId) => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('Benutzer nicht angemeldet');
    
    await firestore()
      .collection(notesCollection)
      .doc(noteId)
      .delete();
  } catch (error) {
    console.error('Fehler beim Löschen der Notiz:', error);
    throw error;
  }
}; 
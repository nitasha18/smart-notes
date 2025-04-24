import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
import { doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

const initialState = {
  notes: [],
  searchQuery: ''
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

// Real-time Firestore listener
export const setupNotesListener = () => (dispatch) => {
  return onSnapshot(collection(db, "notes"), (snapshot) => {
    const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(noteSlice.actions.setNotes(notes));
  });
};

export const addNote = (note) => async () => {
  await setDoc(doc(db, "notes", note.id), note);
};

export const deleteNote = (id) => async () => {
  await deleteDoc(doc(db, "notes", id));
};

export const { setSearchQuery } = noteSlice.actions;
export default noteSlice.reducer;
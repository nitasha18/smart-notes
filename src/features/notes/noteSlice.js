import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
import { doc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';

const initialState = {
  notes: [],
  searchQuery: ''
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const note = { id: Date.now().toString(), ...action.payload };
      setDoc(doc(db, "notes", note.id), note);
      state.notes.push(note);
    },
    deleteNote: (state, action) => {
      deleteDoc(doc(db, "notes", action.payload));
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

// Firestore fetch helper
export const fetchNotes = () => async (dispatch) => {
  const querySnapshot = await getDocs(collection(db, "notes"));
  const notes = querySnapshot.docs.map(doc => doc.data());
  dispatch(noteSlice.actions.setNotes(notes));
};

export const { addNote, deleteNote, setSearchQuery } = noteSlice.actions;
export default noteSlice.reducer;
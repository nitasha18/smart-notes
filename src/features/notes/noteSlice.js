import { createSlice } from '@reduxjs/toolkit';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';

const initialState = {
  notes: [],
  searchQuery: '',
  status: 'idle'
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
    },
    updateNoteInState: (state, action) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    }
  }
});

// Thunk for real-time listener
export const setupNotesListener = () => (dispatch) => {
  return onSnapshot(collection(db, "notes"), (snapshot) => {
    const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(noteSlice.actions.setNotes(notes));
  });
};

// Action creators
export const addNote = (note) => async (dispatch) => {
  await setDoc(doc(db, "notes", note.id), note);
};

export const updateNote = (note) => async (dispatch) => {
  await setDoc(doc(db, "notes", note.id), note);
  dispatch(noteSlice.actions.updateNoteInState(note));
};

export const deleteNote = (id) => async () => {
  await deleteDoc(doc(db, "notes", id));
};

// Export all actions and reducer
export const { setSearchQuery } = noteSlice.actions;
export default noteSlice.reducer;
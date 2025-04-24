import { createSlice } from '@reduxjs/toolkit';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';

const initialState = {
  notes: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
      state.status = 'succeeded';
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const fetchNotes = () => (dispatch) => {
  dispatch(setLoading());
  try {
    return onSnapshot(collection(db, "notes"), (snapshot) => {
      const notes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch(setNotes(notes));
    }, (error) => {
      dispatch(setError(error.message));
    });
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addNote = (note) => async (dispatch) => {
  try {
    await setDoc(doc(db, "notes", note.id), note);
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "notes", id));
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

export const { setNotes, setLoading, setError } = noteSlice.actions;
export default noteSlice.reducer;
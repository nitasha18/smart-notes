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
    console.log("Deleting document with ID:", id);
    await deleteDoc(doc(db, "notes", id));
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error removing document: ", error);
    throw error; 
  }
};

const handleDelete = (id) => {
  console.log("Attempting to delete note ID:", id);
  dispatch(deleteNote(id))
    .unwrap()
    .then(() => console.log("Delete successful"))
    .catch(err => console.error("Delete failed:", err));
};

export const { setNotes, setLoading, setError } = noteSlice.actions;
export default noteSlice.reducer;
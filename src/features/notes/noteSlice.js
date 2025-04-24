import { createSlice } from '@reduxjs/toolkit'
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../services/firebase'

const initialState = {
  notes: [],
  status: 'idle'
}

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload
      state.status = 'succeeded'
    },
    setError: (state, action) => {
      state.status = 'failed'
    }
  }
})

export const setupNotesListener = () => (dispatch) => {
  try {
    return onSnapshot(collection(db, "notes"), 
      (snapshot) => {
        const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        dispatch(setNotes(notes))
      },
      (error) => {
        console.error('Firestore error:', error)
        dispatch(setError())
      }
    )
  } catch (e) {
    console.error('Listener setup failed:', e)
  }
}

export const addNote = (note) => async (dispatch) => {
  try {
    await setDoc(doc(db, "notes", note.id), note)
  } catch (e) {
    console.error('Error adding note:', e)
  }
}

export const deleteNote = (id) => async () => {
  try {
    await deleteDoc(doc(db, "notes", id))
  } catch (e) {
    console.error('Error deleting note:', e)
  }
}

export const { setNotes } = noteSlice.actions
export default noteSlice.reducer
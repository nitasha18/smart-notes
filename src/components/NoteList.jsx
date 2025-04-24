import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setupNotesListener } from '../features/notes/noteSlice';

export default function NoteList() {
  const dispatch = useDispatch();
  const { notes } = useSelector(state => state.notes);

  useEffect(() => {
    const unsubscribe = dispatch(setupNotesListener());
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="note-list">
      {notes.map(note => (
        <div key={note.id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}
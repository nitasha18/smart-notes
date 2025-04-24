import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, setSearchQuery } from '../features/notes/noteSlice';

export default function NoteList() {
  const dispatch = useDispatch();
  const { notes, searchQuery } = useSelector(state => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="note-list">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
      
      {filteredNotes.map(note => (
        <div key={note.id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content.substring(0, 100)}...</p>
          <div className="tags">
            {note.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <button onClick={() => dispatch(deleteNote(note.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}
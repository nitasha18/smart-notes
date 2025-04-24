import { useSelector, useDispatch } from 'react-redux';
import { deleteNote } from '../features/notes/noteSlice';

export default function NoteList() {
  const dispatch = useDispatch();
  const { notes } = useSelector(state => state.notes);

  return (
    <div>
      <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Your Notes</h2>
      
      {notes.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center' }}>No notes yet. Create your first note!</p>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {notes.map(note => (
            <div 
              key={note.id} 
              style={{ 
                padding: '15px', 
                border: '1px solid #eee', 
                borderRadius: '4px',
                background: '#fff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '5px' }}>{note.title || 'Untitled Note'}</h3>
                  <p style={{ marginBottom: '5px', whiteSpace: 'pre-line' }}>{note.content}</p>
                  <small style={{ color: '#999' }}>
                    {new Date(note.createdAt).toLocaleString()}
                  </small>
                </div>
                <button
                  onClick={() => dispatch(deleteNote(note.id))}
                  style={{ 
                    color: '#ff4444',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '5px',
                    marginLeft: '10px'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
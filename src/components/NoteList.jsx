import { useSelector } from 'react-redux'
import { deleteNote } from '../features/notes/noteSlice'

export default function NoteList() {
  const { notes, status } = useSelector(state => state.notes)

  if (status === 'idle') return <div>Loading...</div>
  if (status === 'failed') return <div>Error loading notes</div>

  return (
    <div>
      <h2>Your Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet. Create your first note!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notes.map(note => (
            <li key={note.id} style={{ 
              marginBottom: '1rem', 
              padding: '1rem', 
              border: '1px solid #eee',
              position: 'relative'
            }}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small>{new Date(note.createdAt).toLocaleString()}</small>
              <button
                onClick={() => deleteNote(note.id)}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.25rem 0.5rem',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
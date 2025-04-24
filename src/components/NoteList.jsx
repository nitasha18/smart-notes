import { useSelector } from 'react-redux';
import { deleteNote } from '../features/notes/noteSlice';

export default function NoteList() {
  const { notes, status } = useSelector(state => state.notes);

  if (status === 'loading') return <div className="text-center py-8">Loading notes...</div>;
  if (status === 'failed') return <div className="text-red-500 text-center py-8">Error loading notes</div>;

  return (
    <div className="space-y-4 mt-8">
      {notes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No notes yet. Create your first note!</div>
      ) : (
        notes.map(note => (
          <div key={note.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <h3 className="font-semibold">{note.title || 'Untitled Note'}</h3>
              <button 
                onClick={() => deleteNote(note.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            <p className="mt-2 text-gray-700">{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
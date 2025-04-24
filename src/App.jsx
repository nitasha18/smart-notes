import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNotes } from './features/notes/noteSlice';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Smart Notes</h1>
      <div style={{ background: '#fff', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <NoteEditor />
      </div>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <NoteList />
      </div>
    </div>
  );
}
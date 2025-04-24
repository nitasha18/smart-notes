import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNotes } from './features/notes/noteSlice';
import NoteEditor from './components/NoteEditor';
import NoteList from './components/NoteList';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("App mounted - initializing...");
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Smart Notes</h1>
        <NoteEditor />
        <NoteList />
      </div>
    </div>
  );
}
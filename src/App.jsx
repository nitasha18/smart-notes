import { useEffect } from 'react';
import { setupNotesListener } from './features/notes/noteSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(setupNotesListener());
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="app">
      <NoteEditor />
      <NoteList />
    </div>
  );
}
import { Provider } from 'react-redux';
import { store } from './app/store';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

export default function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <h1>Smart Notes</h1>
        <NoteEditor />
        <NoteList />
      </div>
    </Provider>
  );
}
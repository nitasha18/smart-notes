import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../features/notes/noteSlice';

export default function NoteEditor() {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString()
    };

    dispatch(addNote(note));
    setContent('');
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '100px' }}
          required
        />
      </div>
      <button
        type="submit"
        style={{ width: '100%', padding: '10px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Save Note
      </button>
    </form>
  );
}
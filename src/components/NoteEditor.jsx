import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, updateNote } from '../features/notes/noteSlice';

export default function NoteEditor({ editNote }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(editNote?.content || '');
  const [title, setTitle] = useState(editNote?.title || 'New Note');
  const [tags, setTags] = useState(editNote?.tags || []);

  const handleSave = () => {
    const note = { 
      title, 
      content, 
      tags, 
      date: new Date().toISOString(),
      id: editNote?.id || Date.now().toString() 
    };
    
    if (editNote?.id) {
      dispatch(updateNote(note));
    } else {
      dispatch(addNote(note));
    }
  };

  return (
    <div className="note-editor">
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note..."
      />
      <button onClick={handleSave}>
        {editNote?.id ? 'Update Note' : 'Save Note'}
      </button>
    </div>
  );
}
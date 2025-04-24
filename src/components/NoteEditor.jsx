import { useState } from 'react';
import { addNote, updateNote } from '../features/notes/noteSlice';
import { useDispatch } from 'react-redux';

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
    
    if(editNote?.id) {
      dispatch(updateNote(note));
    } else {
      dispatch(addNote(note));
    }
    
    // Reset form after save
    if(!editNote) {
      setContent('');
      setTitle('New Note');
      setTags([]);
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
      <div className="tags-container">
        {tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <button onClick={handleSave}>
        {editNote?.id ? 'Update Note' : 'Save Note'}
      </button>
    </div>
  );
}
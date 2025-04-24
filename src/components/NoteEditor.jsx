import { useState, useEffect } from 'react';
import { addNote, updateNote } from '../features/notes/noteSlice';
import { generateMetadata } from '../services/openai';
import { ReactComponent as MagicIcon } from '../assets/magic.svg';

export default function NoteEditor({ editNote }) {
  const [content, setContent] = useState(editNote?.content || '');
  const [title, setTitle] = useState(editNote?.title || '');
  const [tags, setTags] = useState(editNote?.tags || []);

  const handleAIAssist = async () => {
    const { title: aiTitle, tags: aiTags } = await generateMetadata(content);
    setTitle(aiTitle);
    setTags(aiTags);
  };

  const handleSave = () => {
    const note = { title, content, tags, date: new Date().toISOString() };
    if(editNote?.id) {
      updateNote({ id: editNote.id, ...note });
    } else {
      addNote(note);
    }
  };

  return (
    <div className="editor-container">
      <div className="ai-assist">
        <button onClick={handleAIAssist}>
          <MagicIcon /> AI Enhance
        </button>
      </div>
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
        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>
      <button onClick={handleSave}>Save Note</button>
    </div>
  );
}
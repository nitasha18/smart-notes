import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNote } from '../features/notes/noteSlice'

export default function NoteEditor() {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  const handleSave = () => {
    if (!content.trim()) return
    
    const note = {
      id: Date.now().toString(),
      title: title || 'Untitled Note',
      content,
      createdAt: new Date().toISOString()
    }

    dispatch(addNote(note))
    setContent('')
    setTitle('')
  }

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        style={{ width: '100%', minHeight: '100px', padding: '0.5rem' }}
      />
      <button 
        onClick={handleSave}
        style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}
      >
        Save Note
      </button>
    </div>
  )
}
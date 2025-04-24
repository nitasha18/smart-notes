import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setupNotesListener } from './features/notes/noteSlice'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Initializing Firestore listener')
    const unsubscribe = dispatch(setupNotesListener())
    return () => unsubscribe()
  }, [dispatch])

  return (
    <div className="app" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Smart Notes</h1>
      <NoteEditor />
      <NoteList />
    </div>
  )
}
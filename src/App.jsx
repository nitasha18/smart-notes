import { ErrorBoundary } from './ErrorBoundary'
import { useEffect } from 'react'
import { setupNotesListener } from './features/notes/noteSlice'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("App mounted, setting up Firestore listener")
    const unsubscribe = dispatch(setupNotesListener())
    return () => unsubscribe()
  }, [dispatch])

  return (
    <ErrorBoundary>
      <div className="app">
        <h1>Smart Notes</h1>
        <NoteEditor />
        <NoteList />
      </div>
    </ErrorBoundary>
  )
}

useEffect(() => {
  import('./services/firebase').then(({db}) => {
    db.collection("test").doc("test").set({test: true})
      .then(() => console.log("Firestore write successful"))
      .catch(e => console.error("Firestore write failed:", e))
  })
}, [])


export default App
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import './index.css'

// Debug check
console.log('React version:', React.version)

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
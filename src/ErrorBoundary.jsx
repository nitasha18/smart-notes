import React from 'react'

export class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("App Crashed:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '20px'}}>
          <h2>App Error</h2>
          <p>Check browser console for details</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )
    }
    return this.props.children
  }
}
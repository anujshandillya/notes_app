import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api', timeout: 15000 })
const emptyNote = { title: '', content: '' }
const errorMessage = (error) => error.response?.data?.message || 'Could not reach your notes. Check that the server is running and try again.'
const formatDate = (value) => value ? new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : ''

function App() {
  const [notes, setNotes] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [draft, setDraft] = useState(emptyNote)
  const [busy, setBusy] = useState(false)

  async function loadNotes() {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.get('/notes')
      if (!Array.isArray(data)) throw new Error('Invalid response')
      setNotes(data)
    } catch (err) { setError(errorMessage(err)) }
    finally { setLoading(false) }
  }

  useEffect(() => {
    const controller = new AbortController()
    api.get('/notes', { signal: controller.signal }).then(({ data }) => {
      if (!Array.isArray(data)) throw new Error('Invalid response')
      setNotes(data)
    }).catch((err) => {
      if (!axios.isCancel(err)) setError(errorMessage(err))
    }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  async function saveNote(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const payload = { title: draft.title.trim(), content: draft.content.trim() }
      const { data } = await api.post('/notes', payload)
      setNotes((current) => [data, ...current])
      setNotice('Note saved.')
      setDraft(emptyNote)
    } catch (err) { setError(errorMessage(err)) }
    finally { setBusy(false) }
  }

  async function deleteNote(note) {
    setBusy(true)
    setError('')
    setNotice('')
    try {
      await api.delete(`/notes/${note._id}`)
      setNotes((current) => current.filter((item) => item._id !== note._id))
      setNotice('Note deleted.')
    } catch (err) { setError(errorMessage(err)) }
    finally { setBusy(false) }
  }

  const filtered = notes.filter((note) => `${note.title} ${note.content}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="/" aria-label="Notes home"><span className="brand-icon" aria-hidden="true">N</span> notes<span className="brand-dot">.</span></a>
        <span className="header-caption">A LITTLE SPACE TO THINK</span>
      </header>
      <main>
        <section className="intro">
          <p className="eyebrow">YOUR EVERYDAY NOTEBOOK</p>
          <h1>Make room for your ideas.</h1>
          <p>Big plans, small reminders, and everything in between.</p>
        </section>
        {error && <div className="error" role="alert"><span>{error}</span><button type="button" disabled={loading || busy} onClick={loadNotes}>Try again</button></div>}
        <p className="notice" role="status">{notice}</p>
        <div className="workspace">
          <aside>
            <div className="section-heading"><h2>Add note</h2><span aria-hidden="true">↗</span></div>
            <p className="muted">Give your idea a little more shape.</p>
            <form onSubmit={saveNote}>
              <label htmlFor="note-title">Title</label>
              <input id="note-title" placeholder="Title" maxLength={100} required value={draft.title} disabled={busy} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
              <label htmlFor="note-content">Your note</label>
              <textarea id="note-content" placeholder="Write a note" required value={draft.content} disabled={busy} onChange={(event) => setDraft({ ...draft, content: event.target.value })} />
              <button className="primary" disabled={busy || !draft.title.trim() || !draft.content.trim()}>{busy ? 'Working…' : 'Save note'}</button>
            </form>
          </aside>
          <section className="collection" aria-labelledby="notes-heading" aria-busy={loading}>
            <div className="collection-toolbar"><h2 id="notes-heading">Your notes <span className="count">{notes.length}</span></h2><label className="search"><span className="sr-only">Search notes</span><input type="search" placeholder="Search notes" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
            {loading ? <div className="empty" role="status">Loading notes...</div> : filtered.length ? <div className="notes-grid">{filtered.map((note) => (
              <article className="note-card" key={note._id}>
                <p className="note-date">{formatDate(note.createdAt)}</p>
                <h3>{note.title}</h3>
                <p className="note-content">{note.content}</p>
                <div className="note-actions"><button className="delete" disabled={busy} onClick={() => deleteNote(note)} aria-label={`Delete ${note.title}`}>Delete</button></div>
              </article>
            ))}</div> : <div className="empty"><span className="empty-icon" aria-hidden="true">✎</span><h3>{query ? 'No notes found.' : 'No notes yet.'}</h3><p>{query ? 'Try another word or clear your search.' : 'Add a note using the form.'}</p>{query && <button onClick={() => setQuery('')}>Clear search</button>}</div>}
          </section>
        </div>
      </main>
      <footer>A place for the things you don’t want to forget.</footer>
    </div>
  )
}
export default App

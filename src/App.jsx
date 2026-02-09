import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Last inn todos ved oppstart
  useEffect(() => {
    loadTodos()
    
    // Sett opp realtime subscription
    const channel = supabase
      .channel('todos')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'todos' }, 
        () => loadTodos()
      )
      .subscribe()

    // Cleanup
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Last inn alle todos
  const loadTodos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTodos(data || [])
      setError(null)
    } catch (error) {
      console.error('Feil ved lasting av todos:', error)
      setError('Kunne ikke laste todos. Sjekk Supabase-innstillingene.')
    } finally {
      setLoading(false)
    }
  }

  // Legg til ny todo
  const addTodo = async (e) => {
    e.preventDefault()
    const title = newTodo.trim()
    
    if (!title) return

    try {
      const { error } = await supabase
        .from('todos')
        .insert([{ title, completed: false }])

      if (error) throw error
      setNewTodo('')
    } catch (error) {
      console.error('Feil ved adding av todo:', error)
      alert('Kunne ikke legge til oppgave: ' + error.message)
    }
  }

  // Toggle completed status
  const toggleTodo = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !currentStatus })
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Feil ved oppdatering av todo:', error)
      alert('Kunne ikke oppdatere oppgave: ' + error.message)
    }
  }

  // Slett todo
  const deleteTodo = async (id) => {
    if (!confirm('Er du sikker på at du vil slette denne oppgaven?')) return

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Feil ved sletting av todo:', error)
      alert('Kunne ikke slette oppgave: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Laster...</div>
      </div>
    )
  }

  return (
    <div className="container">
      <header className="header">
        <h1>📝 Min Todo-liste</h1>
        <p>Organisér dine oppgaver med Supabase</p>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={addTodo} className="add-todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Legg til en ny oppgave..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Legg til
        </button>
      </form>

      <div className="todos-container">
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>Ingen oppgaver ennå. Legg til din første! 🚀</p>
          </div>
        ) : (
          <div className="todos-list">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed || false}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.title}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  Slett
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <p>
          Laget med React og Supabase • {todos.length} {todos.length === 1 ? 'oppgave' : 'oppgaver'}
        </p>
      </footer>
    </div>
  )
}

export default App

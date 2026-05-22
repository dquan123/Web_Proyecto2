import { useState, useEffect, useRef } from 'react'
import { StorageProvider, useStorage } from './context/StorageProvider'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import FormularioItem from './components/FormularioItem'
import ListaItem from './components/ListaItem'

function AppContenido() {
  const { modo, setModo, obtenerItems, guardarItem, eliminarItem, cargando } = useStorage()
  const { tema, toggleTema } = useTheme()
  const [items, setItems] = useState([])

  // useRef #1 — referencia al input de nombre para hacer focus
  const inputRef = useRef(null)
  // useRef #2 — referencia al último item agregado para scroll automático
  const ultimoItemRef = useRef(null)

  // Cargar items al montar y cuando cambia el modo
  useEffect(() => {
    obtenerItems().then(data => setItems(data))
  }, [modo])

  // Atajo Ctrl+N — enfocar el input de nombre
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Atajo T — cambiar tema
  useEffect(() => {
    const handler = (e) => {
      const enInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)
      if (enInput) return
      if (e.key === 't' || e.key === 'T') toggleTema()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggleTema])

  const handleAgregar = async (nuevoItem) => {
    await guardarItem(nuevoItem)
    const data = await obtenerItems()
    setItems(data)
    // useRef #1 — focus al input después de agregar
    inputRef.current?.focus()
    // useRef #2 — scroll al último item
    setTimeout(() => {
      ultimoItemRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleArchivar = async (id) => {
    await eliminarItem(id)
    const data = await obtenerItems()
    setItems(data)
  }

  const handleEditar = async (id, cambios) => {
    const item = items.find(i => i.id === id)
    await guardarItem({ ...item, ...cambios })
    const data = await obtenerItems()
    setItems(data)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="topbar">
        <h1>📗 Mi Álbum de Estampas</h1>
        <div>
          <button className="btn-tema" onClick={toggleTema}>
            {tema === 'claro' ? '🌙 Oscuro' : '☀️ Claro'}
          </button>
          <button className="btn-modo" onClick={() => setModo(modo === 'local' ? 'api' : 'local')}>
            {modo === 'local' ? '💾 Local' : '🌐 API'}
          </button>
        </div>
      </div>

      {cargando && <p>Cargando...</p>}

      <FormularioItem onAgregar={handleAgregar} inputRef={inputRef} />
      <hr />
      <ListaItem
        items={items}
        onArchivar={handleArchivar}
        onEditar={handleEditar}
        ultimoItemRef={ultimoItemRef}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <StorageProvider>
        <AppContenido />
      </StorageProvider>
    </ThemeProvider>
  )
}
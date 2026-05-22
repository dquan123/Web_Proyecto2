import { createContext, useContext, useState, useCallback } from 'react'

const StorageContext = createContext(null)

export function useStorage() {
  return useContext(StorageContext)
}

export function StorageProvider({ children }) {
  const [modo, setModoState] = useState(() =>
    localStorage.getItem('modo') || 'local'
  )
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  const setModo = (nuevoModo) => {
    setModoState(nuevoModo)
    localStorage.setItem('modo', nuevoModo)
  }

  const obtenerItems = useCallback(async () => {
    setCargando(true)
    setError(null)
    try {
      if (modo === 'api') {
        const res = await fetch(`${API_URL}/api/items`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return await res.json()
      } else {
        const data = localStorage.getItem('items')
        return data ? JSON.parse(data) : []
      }
    } catch (err) {
      setError(err.message)
      return []
    } finally {
      setCargando(false)
    }
  }, [modo])

  const guardarItem = useCallback(async (item) => {
    try {
      if (modo === 'api') {
        const res = await fetch(`${API_URL}/api/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return await res.json()
      } else {
        const data = localStorage.getItem('items')
        const items = data ? JSON.parse(data) : []
        const existe = items.find(i => i.id === item.id)
        let nuevaLista
        if (existe) {
          nuevaLista = items.map(i => i.id === item.id ? item : i)
        } else {
          nuevaLista = [...items, item]
        }
        localStorage.setItem('items', JSON.stringify(nuevaLista))
        return item
      }
    } catch (err) {
      setError(err.message)
    }
  }, [modo])

  const eliminarItem = useCallback(async (id) => {
    try {
      if (modo === 'api') {
        const res = await fetch(`${API_URL}/api/items/${id}`, {
          method: 'DELETE'
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        const data = localStorage.getItem('items')
        const items = data ? JSON.parse(data) : []
        const nuevaLista = items.map(i =>
          i.id === id ? { ...i, activo: false } : i
        )
        localStorage.setItem('items', JSON.stringify(nuevaLista))
      }
    } catch (err) {
      setError(err.message)
    }
  }, [modo])

  return (
    <StorageContext.Provider value={{
      modo, setModo, cargando, error,
      obtenerItems, guardarItem, eliminarItem
    }}>
      {children}
    </StorageContext.Provider>
  )
}
import { useState, useEffect } from 'react'
import { categorias } from './utils/categorias'

function App() {
  const [items, setItems] = useState(() => {
    try {
      const guardado = localStorage.getItem('items')
      return guardado ? JSON.parse(guardado) : []
    } catch {
      return []
    }
  })

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
    }, [items])

    const agregarItem = (nuevoItem) => {
        setItems([...items, nuevoItem])
    }

    const archivarItem = (id) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, activo: true } : item))
    }

    const editarItem = (id, cambios) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, ...cambios } : item))
    }

  return <h1>Álbum de Estampas</h1>
}

export default App
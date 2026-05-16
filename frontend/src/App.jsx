import { useState, useEffect } from 'react'
import { categorias } from './utils/categorias'
import FormularioItem from './components/FormularioItem'
import ItemCard from './components/ItemCard'
import ListaItem from './components/ListaItem'

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
            item.id === id ? { ...item, activo: false } : item))
    }

    const editarItem = (id, cambios) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, ...cambios } : item))
    }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Mi colección de de estampas del mundial 2026</h1>
      <FormularioItem onAgregar={agregarItem} />
      <hr />
      <ListaItem
        items={items}
        onArchivar={archivarItem}
        onEditar={editarItem}
      />
    </div>
  )
}

export default App
import ItemCard from './ItemCard'

function ListaItem({ items, onArchivar, onEditar, ultimoItemRef }) {
  const itemsActivos = items.filter(item => item.activo)

  if (itemsActivos.length === 0) {
    return <p>No hay estampas todavía. ¡Agregá una!</p>
  }

  return (
    <div>
      {itemsActivos.map((item, index) => (
        <div
          key={item.id}
          ref={index === itemsActivos.length - 1 ? ultimoItemRef : null}
        >
          <ItemCard
            item={item}
            onArchivar={onArchivar}
            onEditar={onEditar}
          />
        </div>
      ))}
    </div>
  )
}

export default ListaItem
import ItemCard from "./ItemCard";

function ListaItem({ items, onArchivar, onEditar }) {
    const itemArchivos = items.filter(item => item.activo)
    
    if (itemArchivos.length === 0) {
        return <p>No hay estampas aún</p>
    }

    return (
        <div>
            {itemArchivos.map(item => (
                <ItemCard 
                    key={item.id} 
                    item={item} 
                    onArchivar={onArchivar} 
                    onEditar={onEditar} 
                />
            ))}
        </div>
    )
}

export default ListaItem
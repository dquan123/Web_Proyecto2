import { categorias } from "../utils/categorias";

function ItemCard({ item, onArchivar, onEditar }) {
    const categoria = categorias.find(c => c.id === item.categoriaId)

    return (
        <div className = "card">
        <h3>{item.nombre}</h3>
        <p>
            {categoria?.emoji} {categoria?.nombre}
        </p>
        <p>Estado: <strong>{item.estado}</strong></p>
        <p>Número: {item.atributos?.numero}</p>
        {item.notas && <p>Notas: {item.notas}</p>}

        <div className = "card-acciones">
            <select
            value={item.estado}
            onChange={(e) => onEditar(item.id, { estado: e.target.value })}
        >
            <option value="faltante">Faltante</option>
            <option value="repetida">Repetida</option>
            <option value="pegada">Pegada</option>
            </select>

            <button className = "btn-archivar" onClick={() => onArchivar(item.id)}>
                Archivar
            </button>
        </div>
        </div>
    )
}

export default ItemCard
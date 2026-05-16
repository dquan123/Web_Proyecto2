import { categorias } from "../utils/categorias";

function itemCard({ item, onArchivar, onEditar }) {
    const categoria = categorias.find(c => c.id === item.categoriaId)

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '12px', marginBottom: '10px' }}>
        <h3>{item.nombre}</h3>
        <p>
            {categoria?.emoji} {categoria?.nombre}
        </p>
        <p>Estado: <strong>{item.estado}</strong></p>
        <p>Número: {item.atributos?.numero}</p>
        {item.notas && <p>Notas: {item.notas}</p>}

        <select
            value={item.estado}
            onChange={(e) => onEditar(item.id, { estado: e.target.value })}
        >
            <option value="faltante">Faltante</option>
            <option value="repetida">Repetida</option>
            <option value="pegada">Pegada</option>
        </select>

        <button
            onClick={() => onArchivar(item.id)}
            style={{ marginLeft: '10px', color: 'red' }}
        >
            Archivar
        </button>
        </div>
    )
}

export default itemCard
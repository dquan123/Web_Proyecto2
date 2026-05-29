import { categorias } from '../utils/categorias'

function Filtros({ filtroCategoria, filtroEstado, busqueda, dispatch }) {
  return (
    <div style={{
      background: 'var(--color-superficie)',
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '24px',
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      alignItems: 'center',
      border: '1px solid var(--color-borde)'
    }}>
      <input
        type="text"
        placeholder="Buscar estampa..."
        value={busqueda}
        onChange={(e) => dispatch({
          type: 'FILTRAR',
          payload: { campo: 'busqueda', valor: e.target.value }
        })}
        style={{ flex: 1, minWidth: '150px' }}
      />

      <select
        value={filtroCategoria}
        onChange={(e) => dispatch({
          type: 'FILTRAR',
          payload: { campo: 'filtroCategoria', valor: e.target.value }
        })}
      >
        <option value="todas">Todas las categorías</option>
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.emoji} {cat.nombre}
          </option>
        ))}
      </select>

      <select
        value={filtroEstado}
        onChange={(e) => dispatch({
          type: 'FILTRAR',
          payload: { campo: 'filtroEstado', valor: e.target.value }
        })}
      >
        <option value="todos">Todos los estados</option>
        <option value="faltante">Faltante</option>
        <option value="repetida">Repetida</option>
        <option value="pegada">Pegada</option>
      </select>

      <button
        onClick={() => dispatch({ type: 'LIMPIAR_FILTROS' })}
        style={{
          background: 'var(--color-peligro-bg)',
          color: 'var(--color-peligro)',
          border: 'none',
          padding: '8px 14px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Limpiar filtros
      </button>
    </div>
  )
}

export default Filtros
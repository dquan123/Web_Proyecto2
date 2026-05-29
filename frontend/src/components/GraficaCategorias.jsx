import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { categorias } from '../utils/categorias'

function GraficaCategorias({ items }) {
  const datos = categorias.map(cat => ({
    name: cat.nombre,
    value: items.filter(i => i.categoriaId === cat.id && i.activo).length,
    color: cat.color
  })).filter(d => d.value > 0)

  if (datos.length === 0) {
    return (
      <div style={{ marginBottom: '32px' }}>
        <h2>Distribución por categoría</h2>
        <p>No hay estampas para mostrar.</p>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      <h2>Distribución por categoría</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={datos}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {datos.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficaCategorias
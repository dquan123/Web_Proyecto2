import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { categorias } from '../utils/categorias'

function GraficaEstados({ items }) {
  const datos = categorias.map(cat => {
    const delGrupo = items.filter(i => i.categoriaId === cat.id && i.activo)
    return {
      nombre: cat.nombre,
      faltante: delGrupo.filter(i => i.estado === 'faltante').length,
      repetida: delGrupo.filter(i => i.estado === 'repetida').length,
      pegada: delGrupo.filter(i => i.estado === 'pegada').length,
    }
  }).filter(d => d.faltante + d.repetida + d.pegada > 0)

  if (datos.length === 0) {
    return (
      <div style={{ marginBottom: '32px' }}>
        <h2>Estados por categoría</h2>
        <p>No hay estampas para mostrar.</p>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      <h2>Estados por categoría</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={datos}>
          <XAxis dataKey="nombre" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="faltante" name="Faltante" fill="#E63946" radius={[4, 4, 0, 0]} />
          <Bar dataKey="repetida" name="Repetida" fill="#F4A261" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pegada"   name="Pegada"   fill="#2A9D8F" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficaEstados
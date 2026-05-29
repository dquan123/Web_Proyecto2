import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts'

function GraficaActividad({ items }) {
  const datos = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dia = d.toISOString().split('T')[0]
    return {
      fecha: d.toLocaleDateString('es', { weekday: 'short', day: 'numeric' }),
      cantidad: items.filter(item =>
        item.fechaActividad?.startsWith(dia)
      ).length
    }
  })

  return (
    <div style={{ marginBottom: '32px'}}>
      <h2>Actividad últimos 7 días</h2>
      <BarChart width={700} height={220} data={datos}>
        <XAxis dataKey="fecha" tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="cantidad"
          name="Estampas"
          fill="var(--color-acento)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

export default GraficaActividad
/**
 * Hook de dominio para calcular el progreso del álbum de estampas.
 * @param {Array} items - Lista de estampas activas
 * @returns {{ total: number, pegadas: number, faltantes: number, repetidas: number, porcentaje: number }}
 */
import { useMemo } from 'react'

export function useProgresoAlbum(items) {
  const progreso = useMemo(() => {
    const activos = items.filter(i => i.activo)
    const total = activos.length
    const pegadas = activos.filter(i => i.estado === 'pegada').length
    const faltantes = activos.filter(i => i.estado === 'faltante').length
    const repetidas = activos.filter(i => i.estado === 'repetida').length
    const porcentaje = total > 0 ? Math.round((pegadas / total) * 100) : 0

    return { total, pegadas, faltantes, repetidas, porcentaje }
  }, [items])

  return progreso
}
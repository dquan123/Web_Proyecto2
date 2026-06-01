/**
 * Hook para registrar atajos de teclado con cleanup automático.
 * @param {string} tecla - Tecla que activa el atajo (ej: 'n', 't')
 * @param {function} onPress - Función que se ejecuta al presionar la tecla
 * @param {{ ctrl?: boolean }} opciones - Si ctrl es true, requiere Ctrl+tecla
 */
import { useEffect } from 'react'

export function useAtajoTeclado(tecla, onPress, { ctrl = false } = {}) {
  useEffect(() => {
    const handler = (e) => {
      const enInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)
      if (enInput) return
      if (ctrl && !e.ctrlKey) return
      if (e.key.toLowerCase() !== tecla.toLowerCase()) return
      e.preventDefault()
      onPress(e)
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [tecla, onPress, ctrl])
}
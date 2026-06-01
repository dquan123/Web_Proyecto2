/**
 * Hook para sincronizar estado con localStorage.
 * @param {string} clave - Clave bajo la que se guarda en localStorage
 * @param {*} valorInicial - Valor por defecto si no existe la clave
 * @returns {[*, function]} - [valor, setValor]
 */
import { useState, useEffect } from 'react'

export function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave)
      return guardado !== null ? JSON.parse(guardado) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor))
    } catch (e) {
      console.warn(`useLocalStorage: no se pudo guardar "${clave}"`, e)
    }
  }, [clave, valor])

  return [valor, setValor]
}
/**
 * Hook para hacer fetch con manejo de estados y cancelación automática.
 * @param {string} url - URL a la que se hace la petición
 * @returns {{ data: *, cargando: boolean, error: string|null }}
 */
import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) {
      setCargando(false)
      return
    }

    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setCargando(true)
        setError(null)
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setData(json)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setCargando(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url])

  return { data, cargando, error }
}
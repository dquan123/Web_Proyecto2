import { useReducer, useEffect, useRef, useMemo, useCallback } from 'react'
import { StorageProvider, useStorage } from './context/StorageProvider'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { itemsReducer, estadoInicial } from './reducers/itemsReducer'
import { useAtajoTeclado } from './hooks/useAtajoTeclado'
import { useProgresoAlbum } from './hooks/useProgresoAlbum'
import FormularioItem from './components/FormularioItem'
import ListaItem from './components/ListaItem'
import Filtros from './components/Filtros'
import GraficaActividad from './components/GraficaActividad'
import GraficaCategorias from './components/GraficaCategorias'
import GraficaEstados from './components/GraficaEstados'

function AppContenido() {
  const { modo, setModo, obtenerItems, guardarItem, eliminarItem, cargando } = useStorage()
  const { tema, toggleTema } = useTheme()
  const [estado, dispatch] = useReducer(itemsReducer, estadoInicial)

  const inputRef = useRef(null)
  const ultimoItemRef = useRef(null)

  // Cargar items al montar y cuando cambia el modo
  useEffect(() => {
    obtenerItems().then(data => {
      dispatch({ type: 'HIDRATAR', payload: data })
    })
  }, [modo])

  // useAtajoTeclado — reemplaza los useEffect duplicados de atajos
  useAtajoTeclado('h', () => inputRef.current?.focus(), { ctrl: true })
  useAtajoTeclado('t', toggleTema)

  // useMemo — lista filtrada
  const itemsFiltrados = useMemo(() => {
    return estado.lista
      .filter(item => item.activo)
      .filter(item =>
        estado.filtroCategoria === 'todas' ||
        item.categoriaId === estado.filtroCategoria
      )
      .filter(item =>
        estado.filtroEstado === 'todos' ||
        item.estado === estado.filtroEstado
      )
      .filter(item =>
        item.nombre.toLowerCase().includes(estado.busqueda.toLowerCase())
      )
  }, [estado.lista, estado.filtroCategoria, estado.filtroEstado, estado.busqueda])

  // useProgresoAlbum — estadísticas del álbum
  const progreso = useProgresoAlbum(estado.lista)

  // useMemo — estadísticas para las gráficas
  const estadisticas = useMemo(() => ({
    total: itemsFiltrados.length,
    faltantes: itemsFiltrados.filter(i => i.estado === 'faltante').length,
    repetidas: itemsFiltrados.filter(i => i.estado === 'repetida').length,
    pegadas: itemsFiltrados.filter(i => i.estado === 'pegada').length,
  }), [itemsFiltrados])

  // useCallback — handlers estables para ItemCard
  const handleArchivar = useCallback(async (id) => {
    await eliminarItem(id)
    dispatch({ type: 'ELIMINAR', payload: id })
  }, [eliminarItem])

  const handleEditar = useCallback(async (id, cambios) => {
    const item = estado.lista.find(i => i.id === id)
    const itemActualizado = { ...item, ...cambios }
    await guardarItem(itemActualizado)
    dispatch({ type: 'CAMBIAR_ESTADO', payload: { id, estado: cambios.estado } })
  }, [estado.lista, guardarItem])

  const handleAgregar = async (nuevoItem) => {
    await guardarItem(nuevoItem)
    dispatch({ type: 'AGREGAR', payload: nuevoItem })
    inputRef.current?.focus()
    setTimeout(() => {
      ultimoItemRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="topbar">
        <h1>📗 Mi Álbum de Estampas</h1>
        <div>
          <button className="btn-tema" onClick={toggleTema}>
            {tema === 'claro' ? '🌙 Oscuro' : '☀️ Claro'}
          </button>
          <button className="btn-modo" onClick={() => setModo(modo === 'local' ? 'api' : 'local')}>
            {modo === 'local' ? '💾 Local' : '🌐 API'}
          </button>
        </div>
      </div>

      {cargando && <p>Cargando...</p>}

      <div style={{
        background: 'var(--color-superficie)',
        padding: '12px 16px',
        borderRadius: '12px',
        marginBottom: '16px',
        border: '1px solid var(--color-borde)',
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <span>📊 Total: <strong>{progreso.total}</strong></span>
        <span>✅ Pegadas: <strong>{progreso.pegadas}</strong></span>
        <span>❌ Faltantes: <strong>{progreso.faltantes}</strong></span>
        <span>🔁 Repetidas: <strong>{progreso.repetidas}</strong></span>
        <span>🎯 Completado: <strong>{progreso.porcentaje}%</strong></span>
      </div>

      <FormularioItem onAgregar={handleAgregar} inputRef={inputRef} />

      <Filtros
        filtroCategoria={estado.filtroCategoria}
        filtroEstado={estado.filtroEstado}
        busqueda={estado.busqueda}
        dispatch={dispatch}
      />

      <GraficaActividad items={itemsFiltrados} />
      <GraficaCategorias items={itemsFiltrados} />
      <GraficaEstados items={itemsFiltrados} />

      <hr />

      <ListaItem
        items={itemsFiltrados}
        onArchivar={handleArchivar}
        onEditar={handleEditar}
        ultimoItemRef={ultimoItemRef}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <StorageProvider>
        <AppContenido />
      </StorageProvider>
    </ThemeProvider>
  )
}
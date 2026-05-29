export const estadoInicial = {
  lista: [],
  filtroCategoria: 'todas',
  filtroEstado: 'todos',
  busqueda: '',
}

export function itemsReducer(estado, accion) {
  switch (accion.type) {
    case 'HIDRATAR':
      return { ...estado, lista: accion.payload }

    case 'AGREGAR':
      return { ...estado, lista: [...estado.lista, accion.payload] }

    case 'ELIMINAR':
      return {
        ...estado,
        lista: estado.lista.map(item =>
          item.id === accion.payload ? { ...item, activo: false } : item
        )
      }

    case 'CAMBIAR_ESTADO':
      return {
        ...estado,
        lista: estado.lista.map(item =>
          item.id === accion.payload.id
            ? { ...item, estado: accion.payload.estado }
            : item
        )
      }

    case 'FILTRAR':
      return { ...estado, [accion.payload.campo]: accion.payload.valor }

    case 'LIMPIAR_FILTROS':
      return {
        ...estado,
        filtroCategoria: 'todas',
        filtroEstado: 'todos',
        busqueda: ''
      }

    case 'REGISTRAR_ACTIVIDAD':
      return {
        ...estado,
        lista: estado.lista.map(item =>
          item.id === accion.payload.id
            ? { ...item, fechaActividad: accion.payload.fecha }
            : item
        )
      }

    default:
      throw new Error(`Acción desconocida: ${accion.type}`)
  }
}
# Mi Álbum de Estampas — Mundial 2026

Aplicación para gestionar mi colección de estampas del Mundial 2026.

## Stack
- Frontend: React 18 + Vite
- Backend: Node.js + Express
- Base de datos: SQLite (better-sqlite3)

## Cómo correr el proyecto

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node src/index.js
```

## Mis primeros Items

![Mis estampas](mis_estampas.png)

## Mi paleta de colores

### Tema Claro
| Color | Hex | Uso | Justificación |
|---|---|---|---|
| Fondo | #f0f4f8 | Fondo general | Azul muy claro parecido al del álbum real |
| Superficie | #ffffff | Tarjetas y formulario | Blanco puro para contrastar con el fondo |
| Texto | #1a1a2e | Texto principal | Azul más oscuro, más suave que el negro para lectura |
| Acento | #4f46e5 | Botones y links | Índigo que da resalte pero sin ser intenso |
| Borde | #e0e0e0 | Bordes de tarjetas | Gris neutro que separa elementos |
| Peligro | #dc2626 | Botón archivar | Rojo  de alerta, inmediatamente reconocible |

### Tema Oscuro
| Color | Hex | Uso | Justificación |
|---|---|---|---|
| Fondo | #0f172a | Fondo general | Azul muy oscuro que no es negro puro, pero mucho más oscuro que el modo claro |
| Superficie | #1e293b | Tarjetas y formulario | Capa más clara que el fondo para crear profundidad visual |
| Texto | #f1f5f9 | Texto principal | Blanco suave, menos contraste que el blanco puro |
| Acento | #818cf8 | Botones y links | Índigo más claro que en modo claro para que se pueda seguir leyendo |
| Borde | #334155 | Bordes de tarjetas | Azul con tonos grises que separa sin romper combinación oscura |
| Peligro | #f87171 | Botón archivar | Rojo claro que funciona sobre fondos oscuros sin perder su funcionalidad |

## Profiler — Optimización con useMemo

### Antes
![Profiler antes](profiler_antes.png)

AppContenido tardó 24.8ms. Todos los componentes se re-renderizaron
al escribir en el buscador.

### Después
![Profiler después](profiler_despues.png)

AppContenido bajó a 19.6ms. useMemo evita recalcular la lista filtrada
y las estadísticas en cada render, reduciendo el trabajo del componente principal.

## Mi gráfica original
![Grafica 3](grafica-3.png)

La tercera gráfica muestra los estados de las estampas (faltante, repetida, pegada)
agrupados por categoría usando un BarChart agrupado. La elegí porque de un vistazo
puedo ver en qué grupos del álbum me faltan más estampas y dónde tengo más repetidas,
que es la información más útil para saber con quién intercambiar.

## Mis 3 decisiones técnicas

1. **Estructura del reducer**: organicé las acciones separando las que modifican
la lista (AGREGAR, ELIMINAR, CAMBIAR_ESTADO) de las que modifican los filtros
(FILTRAR, LIMPIAR_FILTROS) para que sea fácil encontrar cada caso.

2. **Acción más difícil**: REGISTRAR_ACTIVIDAD, porque debía actualizar solo
el campo fechaActividad del item correcto sin mutar el estado anterior,
usando map() para crear un nuevo array.

3. **Gráfica más compleja**: GraficaEstados, porque transforma los datos dos veces:
primero agrupa por categoría y luego cuenta por estado dentro de cada grupo,
generando el formato que necesita el BarChart agrupado.
=======

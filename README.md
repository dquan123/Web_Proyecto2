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

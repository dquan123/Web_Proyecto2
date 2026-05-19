const express = require('express')
const router = express.Router()
const db = require('../db/database')

// GET /api/items — devuelve todos los activos
router.get('/', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM items WHERE activo = 1').all()
    res.json(rows.map(r => ({
      ...r,
      activo: Boolean(r.activo),
      atributos: JSON.parse(r.atributos || '{}')
    })))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/items — crea una estampa
router.post('/', (req, res) => {
  const { nombre, categoriaId, estado = 'faltante', notas = '', atributos = {} } = req.body
  if (!nombre || nombre.trim().length < 2)
    return res.status(400).json({ error: 'Nombre demasiado corto' })
  try {
    const nuevo = {
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      categoriaId,
      estado,
      puntuacion: null,
      fechaRegistro: new Date().toISOString(),
      fechaActividad: new Date().toISOString(),
      notas,
      atributos: JSON.stringify(atributos),
      activo: 1
    }
    db.prepare(`
      INSERT INTO items (id,nombre,categoriaId,estado,puntuacion,fechaRegistro,fechaActividad,notas,atributos,activo)
      VALUES (@id,@nombre,@categoriaId,@estado,@puntuacion,@fechaRegistro,@fechaActividad,@notas,@atributos,@activo)
    `).run(nuevo)
    res.status(201).json({ ...nuevo, activo: true, atributos })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/items/:id — actualiza una estampa
router.put('/:id', (req, res) => {
  const { nombre, estado, puntuacion, notas, atributos } = req.body
  try {
    const info = db.prepare(`
      UPDATE items SET
        nombre = COALESCE(@nombre, nombre),
        estado = COALESCE(@estado, estado),
        puntuacion = COALESCE(@puntuacion, puntuacion),
        notas = COALESCE(@notas, notas),
        atributos = COALESCE(@atributos, atributos),
        fechaActividad = @fechaActividad
      WHERE id = @id
    `).run({
      id: req.params.id,
      nombre: nombre || null,
      estado: estado || null,
      puntuacion: puntuacion || null,
      notas: notas || null,
      atributos: atributos ? JSON.stringify(atributos) : null,
      fechaActividad: new Date().toISOString()
    })
    if (info.changes === 0) return res.status(404).json({ error: 'No encontrado' })
    res.json({ mensaje: 'Actualizado correctamente' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/items/:id — archiva una estampa
router.delete('/:id', (req, res) => {
  try {
    const info = db.prepare('UPDATE items SET activo = 0 WHERE id = ?').run(req.params.id)
    if (info.changes === 0) return res.status(404).json({ error: 'No encontrado' })
    res.json({ mensaje: 'Archivado correctamente' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/items/:id/registro — crea registro de actividad
router.post('/:id/registro', (req, res) => {
  const { valor, notas = '' } = req.body
  if (valor === undefined) return res.status(400).json({ error: 'El campo valor es requerido' })
  try {
    const registro = {
      id: crypto.randomUUID(),
      itemId: req.params.id,
      fecha: new Date().toISOString().split('T')[0],
      valor: Number(valor),
      notas
    }
    db.prepare(`
      INSERT INTO registros (id, itemId, fecha, valor, notas)
      VALUES (@id, @itemId, @fecha, @valor, @notas)
    `).run(registro)
    res.status(201).json(registro)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
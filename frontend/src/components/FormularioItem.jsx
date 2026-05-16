import {useState} from 'react'
import { categorias } from '../utils/categorias'

function FormularioItem({ onAgregar }) {
    const [nombre, setNombre] = useState('')
    const [categoriaId, setCategoriaId] = useState(categorias[0].id)
    const [estado, setEstado] = useState('faltante')
    const [notas, setNotas] = useState('')
    const [numero, setNumero] = useState('')
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (nombre.trim().length < 2) return alert('El nombre debe tener al menos 2 caracteres')

        const nuevoItem = {
            id: crypto.randomUUID(),
            nombre: nombre.trim(),
            categoriaId,
            estado,
            puntuacion: null,
            fechaRegistro: new Date().toISOString(),
            fechaActividad: new Date().toISOString(),
            notas,
            atributos: { 
                numero: Number (numero),
                repetidas: 0
            },
            activo: true
        }

        onAgregar(nuevoItem)
        setNombre('')
        setCategoriaId(categorias[0].id)
        setEstado('faltante')
        setNotas('')
        setNumero('')

    }


    return (
        <form onSubmit={handleSubmit}>
        <h2>Agregar Estampa</h2>

        <div>
            <label>Nombre:</label>
            <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Cristiano Ronaldo"
            />
        </div>

        <div>
            <label>Grupo:</label>
            <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
            {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.nombre}
                </option>
            ))}
            </select>
        </div>

        <div>
            <label>Estado:</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="faltante">Faltante</option>
            <option value="repetida">Repetida</option>
            <option value="pegada">Pegada</option>
            </select>
        </div>

        <div>
            <label>Número de estampa:</label>
            <input
            type="number"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Ej: 45"
            />
        </div>

        <div>
            <label>Notas:</label>
            <input
            type="text"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Opcional"
            />
        </div>

        <button type="submit">Agregar</button>
        </form>
    )
}

export default FormularioItem
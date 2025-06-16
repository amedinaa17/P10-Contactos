const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let contactos = [
    { id: 1, nombre: 'Ana Medina', telefono: '55 1234 5678' },
    { id: 2, nombre: 'José Martínez', telefono: '55 5678 9012' },
    { id: 2, nombre: 'Said Sigala', telefono: '55 3456 7890' },
];

// GET - Obtener todos los contactos
app.get('/api/contactos', (req, res) => {
    res.json(contactos);
});

// POST - Crear un nuevo contacto
app.post('/api/contactos', (req, res) => {
    const { nombre, telefono } = req.body;
    const contacto = {
        id: contactos.length + 1,
        nombre,
        telefono,
    };
    contactos.push(contacto);
    res.status(201).json(contacto);
});

// PUT - Actualizar un contacto
app.put('/api/contactos/:id', (req, res) => {
    const contacto = contactos.find(c => c.id === parseInt(req.params.id));
    if (!contacto) return res.status(404).send('Contacto no encontrado');
    
    const { nombre, telefono } = req.body;
    contacto.nombre = nombre;
    contacto.telefono = telefono;
    res.json(contacto);
});

// DELETE - Eliminar un contacto
app.delete('/api/contactos/:id', (req, res) => {
    const contactoIndex = contactos.findIndex(c => c.id === parseInt(req.params.id));
    if (contactoIndex === -1) return res.status(404).send('Contacto no encontrado');
    
    contactos.splice(contactoIndex, 1);
    res.json({ message: 'Contacto eliminado con éxito' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});

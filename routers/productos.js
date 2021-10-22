const express = require('express');

const Contenedor = require('../Contenedor');

const productosContenedor = new Contenedor('./data/productos.json');
const productosRouter = express.Router();

productosRouter.get('/lista-productos', async (req, res) => {
    const lista = await productosContenedor.getAll();
    res.render('../views/pages/lista-productos', {
        message: 'success',
        data: lista
    });
})

productosRouter.get('/form', async (req, res) => {
    res.render('../views/pages/form');
})

productosRouter.post('/form', async(req, res) => {
    const nuevoProducto = req.body;

    const productoGuardado = await productosContenedor.save(nuevoProducto);

    res.redirect('./lista-productos')
    res.send({
        data:{
        ...nuevoProducto
    }
    });
 });

module.exports = productosRouter;

console.log(__dirname);
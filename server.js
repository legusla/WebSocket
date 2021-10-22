const express = require('express');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const Contenedor = require('./Contenedor');

const productosRouter = require('./routers/productos');

const { getMessages, saveMessage } = require('./models/Messages');

const miContenedor = new Contenedor('./data/productos.json');

const app = express();
const httpServer = HttpServer(app);
const io = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

const productosContenedor = new Contenedor('./data/productos.json');

io.on('connection', async socket => {
    console.log(`Nuevo cliente conectado! ${socket.id}`)
    
    // Mensajes
    const messages = await getMessages();
    socket.emit('messages', messages); 
    
    // Fecha y hora
    socket.on('new-message', async message => {
        message.fyh = new Date().toLocaleDateString();

        await saveMessage(message);
  
        const messages = getMessages() 
        io.sockets.emit('messages', messages)  
  });

    // Agrega producto

    const products = await miContenedor.getAll();
    socket.emit('products', products);

    // Productos
    socket.on('new-products',  (product) => {
    productosContenedor.save(product);
    const products = productosContenedor.getAll();
    });
});

app.use('/api/productos', productosRouter);

app.get('/', async (req, res) => {
    const lista = await productosContenedor.getAll();
    res.render('../views/pages/form');
});

app.get('/form', async (req, res) => {
    res.render('../views/pages/form');
});

app.get('/productos',  async function (req,res){
    productos = await productosContenedor.getAll();
    res.render('pages/list-productos', {
       productos
    })
});

app.post('/api/productos', async (req,res) => {

    const nuevoProducto = req.body;

    const productoGuardado = await productosContenedor.save(nuevoProducto);
    res.render('pages/list-productos')
});

app.use(function (err, req, res, next) {
    console.error(error.stack);
    res.status(500).send('Algo se rompio!');
})

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http corriendo en http://localhost:${connectedServer.address().port}`)
})

connectedServer.on('error', error => console.log(`Error en servidor: ${error}`));
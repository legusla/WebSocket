const socket = io.connect();

const forms = document.getElementById('forms');

forms.addEventListener('submit', (event) => {
  // pagina no se recarga
  event.preventDefault();

  // Agrega el producto
  const nombre = document.getElementsByName('nombre')[0].value;
  const precio = document.getElementsByName('precio')[0].value;
  const imagen = document.getElementsByName('imagen')[0].value;

  //envia el producto
  socket.emit('new-product', {nombre, precio, imagen});
  console.log({nombre, precio, imagen});

  // limpiamos el form
  document.getElementById('nombre').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('imagen').value = '';

});

socket.on('products', (products) => {
  console.log(products);

  const productList = products.map((product) => `
  <li>Nombre: ${product.nombre} - Precio: ${product.precio}</li>
  `).join(" ");

  const list = document.getElementById('real-time-products');

  list.innerHTML = `<ul>${productList}</ul>`;

});


const renderMessages = (messages) => {
  const htmls = messages.map((messsage) => {
    return(`
      <div>
        <strong>${messsage.author}</strong>:
        <em>${messsage.text}</em>
      </div>
    `);
  });

  const html = htmls.join(" ");

  document.getElementById('messages').innerHTML = html;
}

const addMessage = (event) => {
  // la pagina no se recarga
  event.preventDefault();

  // mensajes
  const mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  // enviamos el mensaje
  socket.emit('new-message', mensaje);

  // limpiamos el form
  document.getElementById('username').value = '';
  document.getElementById('texto').value = '';
};

const form = document.getElementById('form');
form.addEventListener('submit', addMessage);

socket.on('messages', data => {
  console.log(data);
  renderMessages(data);
});
const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
   }
   
    async save(producto) {
    try {
        const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
  
        let productos = [];

        if (contenido === '') {
            producto.id = 1;
            productos.push(producto);
        } else {
            const listaDeProducto = JSON.parse(contenido);

            producto.id = listaDeProducto[listaDeProducto.length - 1].id + 1;
            listaDeProducto.push(producto);
            productos = listaDeProducto;
        }

        const productosString = JSON.stringify(productos, null, 2);
        await fs.promises.writeFile(`./${this.file}`, productosString);

        return producto.id;
    }   catch (error) {
        console.error('Error', error);
        };
    }

    async getById(id) {
        try {
            const contenido = await fs.promises.readFile(`./${this.file}`);
            const listaDeProducto = JSON.parse(contenido);
            const prod = listaDeProducto.find(producto => {
                return producto.id === parseInt(id);
            })
            if(prod){
                id !== id;
            } else {
            
                return  null;
            }
            return prod;
        }   catch (error) {
            console.error('Error', error);
        };
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            const listaDeProducto = JSON.parse(contenido);

            return listaDeProducto;
        }   catch (error) {
            console.error('Error', error);
        };
    }

    async deleteById(id) {
        try {
            const contenido = await fs.promises.readFile(`./${this.file}`);
            const listaDeProducto = JSON.parse(contenido);
            const nuevaLista = listaDeProducto.filter(producto => producto.id !== parseInt(id));
            const lista = JSON.stringify(nuevaLista);
            const listaP = await fs.promises.writeFile(`./${this.file}`, lista);
            
            return nuevaLista;
        }   catch (error) {
            console.log('Error', error);
        };
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.file}`, '');
        }   catch (error) {
            console.error('Error', error);
        };
    }

    async update(id, elemento) {
        try {
            const lista = await this.getAll();

            const elementoGuardado = lista.find((item) => item.id === parseInt(id));
            const indexElementoGuardado = lista.findIndex((item) => item.id === parseInt(id));

            if (!elementoGuardado) {
                console.error(`Elemento con id: '${id}' no fue encontrado`);
                return null;
            }

            const elementoActualizado = {
                ...elementoGuardado,
                ...elemento
            };

            lista[indexElementoGuardado] = elementoActualizado;

            const elementosString = JSON.stringify(lista, null, 2);
            await fs.promises.writeFile(`./${this.file}`, elementosString);

            return elementoActualizado;
        }
        catch (error) {
            console.log("Hubo un error: ",error);
        }
    }
    
}

module.exports = Contenedor;
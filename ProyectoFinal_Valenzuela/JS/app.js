// Array de productos simulados
const productos = [
    { id: 1, nombre: "Malbec", precio: 3500 },
    { id: 2, nombre: "Cabernet Sauvignon", precio: 4200 },
    { id: 3, nombre: "Syrah", precio: 3100 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos = document.getElementById("productos-container");
const contenedorCarrito = document.getElementById("carrito-container");
const total = document.getElementById("total");

function mostrarProductos() {
    contenedorProductos.innerHTML = "";
    productos.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>Precio: $${prod.precio}</p>
            <button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
        `;
        contenedorProductos.appendChild(div);
    });
}

function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <h4>${item.nombre}</h4>
            <p>Precio unitario: $${item.precio}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Total: $${item.precio * item.cantidad}</p>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        contenedorCarrito.appendChild(div);
    });

    const totalCompra = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    total.textContent = "Total: $" + totalCompra;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
    const productoExistente = carrito.find(p => p.id === id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const producto = productos.find(p => p.id === id);
        producto.cantidad = 1;
        carrito.push(producto);
    }
    mostrarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    mostrarCarrito();
}

mostrarProductos();
mostrarCarrito();
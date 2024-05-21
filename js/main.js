let productos = [
    { nombre: 'Mermelada casera', precio: 2500 },
    { nombre: 'Condimentos', precio: 750 },
    { nombre: 'Aromáticas', precio: 800 },
    { nombre: 'Nueces por kilo', precio: 9000 },
    { nombre: 'Almendras por kilo', precio: 12000 },
    { nombre: 'Pasas de higos por kilo', precio: 4500 },
    { nombre: 'Pasas de ciruela por kilo', precio: 4000 },
    { nombre: 'Pasas de uva por kilo', precio: 6000 }
];

let carrito = [];
let totalCompra = 0;

function seleccionarProductos() {
    let continuarComprando = true;

    while (continuarComprando) {
        let opciones = productos.map((producto, index) => `${index + 1}. ${producto.nombre} ($${producto.precio})`).join("\n");
        let seleccion = prompt(`Seleccione un producto:\n${opciones}`);

        if (seleccion === null) {
            continuarComprando = false;
            break;
        }

        let indexSeleccionado = parseInt(seleccion) - 1;

        if (indexSeleccionado >= 0 && indexSeleccionado < productos.length) {
            let productoSeleccionado = productos[indexSeleccionado];
            agregarCarrito(productoSeleccionado);
        } else {
            alert("Selección no válida");
        }

        continuarComprando = confirm("¿Desea comprar otro producto?");
    }

    finalizarCompra();
}

function agregarCarrito(producto) {
    let cantidad = prompt(`Ingrese la cantidad de ${producto.nombre} que desea comprar:`);

    if (cantidad === null) {
        return;
    }

    if (!isNaN(cantidad) && parseInt(cantidad) > 0) {
        cantidad = parseInt(cantidad);
        let subTotal = producto.precio * cantidad;
        carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad, subTotal });
        totalCompra += subTotal;

        alert(`${producto.nombre}\nCantidad: ${cantidad}\nSubtotal: $${subTotal}\nTotal: $${totalCompra}`);
    } else {
        alert("La cantidad ingresada no es válida.");
        agregarCarrito(producto);
    }
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("No hay ningún producto en el carrito.");
        return;
    }

    carrito.sort((a, b) => a.subTotal - b.subTotal);

    let detalleCompra = carrito.map(item => `Producto: ${item.nombre}\nPrecio: $${item.precio}\nCantidad: ${item.cantidad}\nSubtotal: $${item.subTotal}`).join(`\n\n`);
    alert(`Detalle de la Compra:\n\n${detalleCompra}\n\nTotal: $${totalCompra}`);

    console.log("Carrito de compra:", carrito);
    console.log(`Total de la compra: $${totalCompra}`);

    carrito = [];
    totalCompra = 0;
}

seleccionarProductos();
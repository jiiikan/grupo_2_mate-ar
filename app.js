const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const funca = 'Servidor funcionando en localhost: ';

app.listen(port, ()=>{
    console.log(funca + port);
    });

const pathPublic = path.resolve(__dirname, 'public');
const static = express.static(pathPublic);
app.use(static);


app.get("/carro", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/carrito.html"));
});

app.get("/acceso", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/acceso.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
});

app.get("/Producto", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/detalleProducto.html"));
});

app.get("/categoria-jeans", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/categoria-jeans.html"));
});

app.get("/detalleProducto", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/detalleProducto.html"));
});

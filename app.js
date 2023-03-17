const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const funca = () => console.log('Servidor funcionando en localhost: ');

app.listen(port, funca);
app.set("view engine", `ejs`);
//const pathPublic = path.resolve(__dirname, 'public');
//const static = express.static(pathPublic);
//app.use(static);

app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/home.html"));
});

app.get("/carro", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/users/carrito.html"));
});

app.get("/acceso", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/users/login.html"));
});

app.get("/registro", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/users/registro.html"));
});

app.get("/producto", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/products/detalleProducto.html"));
});

app.get("/catalogo", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/products/catalogo.html"));
});


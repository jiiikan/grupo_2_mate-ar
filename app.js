const express = require('express');
const app = express();

const path = require('path');

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
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

app.get("/detalleProducto", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/detalleProducto.html"));
});

app.get("/registro", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/registro.html"));
});

app.get("/acceso", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/acceso.html"));
});

app.get("/carro", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/carrito.html"));
});



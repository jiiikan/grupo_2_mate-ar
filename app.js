const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const funca = () => console.log('Servidor funcionando en localhost: ');

const products = require("./src/routes/products.js");
const users = require("./src/routes/users.js");

app.listen(port, funca);
app.set("view engine", `ejs`);

app.use(express.static("./public"));

app.use("/", products);
app.use("/catalogo", products);
app.use("/detalle", products);
app.use("/iditor", products);

app.use("/login", users);
app.use("/registro", users);
app.use("/carro", users);


//app.get("/carro", (req, res) => {
//    res.sendFile(path.resolve(__dirname, "./src/views/users/carrito.ejs"));
//});
//app.get("/login", (req, res) => {
//    res.sendFile(path.resolve(__dirname, "./src/views/users/login.html"));
//});
//app.get("/registro", (req, res) => {
//    res.sendFile(path.resolve(__dirname, "./src/views/users/registro.html"));
//});



//const pathPublic = path.resolve(__dirname, 'public');
//const static = express.static(pathPublic);
//app.use(static);
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookies = require('cookie-parser');
const bodyParser = require('body-parser');

// CONFIGURACION DEL SERVIDOR
const port = process.env.PORT || 3000;
const funca = () => console.log('Servidor funcionando en localhost: ' + port);

//Middleware para recordar usuario
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

// Config Ejs
app.engine('html', require('ejs').renderFile);
app.set("views", path.resolve(__dirname,"./views"));
app.set("view engine", `ejs`);

// Levantamos servidor   
//- correr con node: npm start -- correr con nodemon: npm run dev -
app.listen(port, funca);

// Archivos estaticos (NECESARIOS) 
const public = path.resolve(__dirname, '../public');
app.use(express.static(public));
app.use(express.urlencoded({ extended: false}));

// Rutas
const home = require("./routes/home");
const products = require("./routes/products.js");
const users = require("./routes/users.js");
const { cookie } = require('express-validator');
const api = require("./routes/api.js")

// Renderizacion de paginas 
app.use("/", home)
app.use("/products", products);
app.use("/users", users);
app.use("/api", api);

// Error 404
app.use((req, res, next) => {
    res.status(404).render("error404");
});

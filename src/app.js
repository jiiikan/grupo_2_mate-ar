const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const funca = () => console.log('Servidor funcionando en localhost: ');


// Config Ejs

app.engine('html', require('ejs').renderFile);
app.set("views", path.resolve(__dirname,"./views"));
app.set("view engine", `ejs`);

// Levantamos servidor   
//- correr con node: npm start -- correr con nodemon: npm run dev -

app.listen(port, funca);

// Archivos estaticos 
const public = path.resolve(__dirname, '../public');
app.use(express.static(public));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
//app.use(express.static("./public"));

// Rutas

const home = require("./routes/home");
const products = require("./routes/products.js");
const users = require("./routes/users.js");

//  Paginas 

app.use("/", home)
app.use("/products", products);
app.use("/users", users);

// Error 404
app.use((req, res, next) => {
    res.status(404).render("error404");
    next();
});

/*app.use("/catalogo", products);
app.use("/detalle", products);
app.use("/editor", products);
app.use("/create", products);*/

/*app.use("/login", users);
app.use("/registro", users);
app.use("/carrito", users);*/




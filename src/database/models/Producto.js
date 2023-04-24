module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true
        },
        nombre:{
            type: dataTypes.STRING
        },
        descripcion:{
            type: dataTypes.STRING

        },
        precio:{
            type: dataTypes.INTEGER

        },
        imagen:{
            type: dataTypes.STRING

        },
        id_categoria: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tablename: "Productos",
        timestamps:false
    }

const Producto = sequelize.define(alias, cols, config)
return Producto

}

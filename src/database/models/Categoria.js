module.exports = (sequelize, dataTypes) => {
    let alias = "Categoria";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: dataTypes.STRING
        }
    }
    let config = {
        tablename: "categorias",
        timestamps:false
    }

const Categoria = sequelize.define(alias, cols, config)
return Categoria
// va a servir para los filtros de busqueda

}

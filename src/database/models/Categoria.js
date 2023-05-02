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

Categoria.associate = function(models) {
    Categoria.hasMany(models.Producto, {
        as: "productos",
        foreignKey: "id_categoria"
    })
}
return Categoria
// va a servir para los filtros de busqueda

}

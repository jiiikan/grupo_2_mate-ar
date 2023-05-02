module.exports = (sequelize, dataTypes) => {
    let alias = "Categoria";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        },
        product_id: {
            type: dataTypes.INTEGER,
            foreignKey: true
        }
    }
    let config = {
        tablename: "categories",
        timestamps:false
    }

const Categoria = sequelize.define(alias, cols, config)

Categoria.associate = function(models){
    Categoria.hasMany(models.Producto, {
        as: "products",
        foreignKey: "category_id"
    })
}

return Categoria
// va a servir para los filtros de busqueda

}

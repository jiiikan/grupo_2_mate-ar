module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: dataTypes.STRING
        },
        description:{
            type: dataTypes.STRING

        },
        price:{
            type: dataTypes.INTEGER

        },
        image:{
            type: dataTypes.STRING

        },
        category_id: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tablename: "products",
        timestamps:false
    }

const Producto = sequelize.define(alias, cols, config)

Producto.associate = function(models){
    Producto.belongsTo(models.Categoria, {
        as: "categoria",
        foreignKey: "category_id"
    })
}

return Producto



}

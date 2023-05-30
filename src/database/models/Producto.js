module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        price:{
            type: dataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        image:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        category_id: {
            type: dataTypes.INTEGER,
            foreignKey: true
        },
        /*marked: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
          }*/
    }
    let config = {
        tableName: "products",
        timestamps:false
    }

const Producto = sequelize.define(alias, cols, config)

Producto.associate = function(models){
    Producto.belongsTo(models.Categoria, {
        as: "categories",
        foreignKey: "category_id"
    })

Producto.OrderItems = Producto.hasMany(models.OrderItem, {
        as: "orderItems",
        foreignKey: "productId"
      });

    /*Producto.hasMany(models.Carrito, {
        as: 'cart',
        foreignKey: 'cart_id'
    })*/
}
return Producto;

}

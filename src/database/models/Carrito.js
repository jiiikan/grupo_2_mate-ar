module.exports = (sequelize, dataTypes) => {
    let alias = "Carrito";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: dataTypes.STRING,
            foreignKey: true
        },
        product_id: {
            type: dataTypes.INTEGER,
            foreignKey: true
        }
    }
    let config = {
        tablename: "carts",
        timestamps:false
    }

const Carrito = sequelize.define(alias, cols, config)

/*Carrito.associate = function(models){
    Carrito.belongToMany(models.Producto, {
        as: "products",
        through: "Carrito",
        foreignKey: "product_id",
        otherKey: "cart_id",
        timestamps: false
    })
}*/

return Carrito
}

module.exports = (sequelize, dataTypes) => {
    let alias = "Carrito";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total:{
            type: dataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        method_payment: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
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
        tableName: "cart",
        timestamps:false
    }

const Carrito = sequelize.define(alias, cols, config)

return Carrito
}

module.exports = (sequelize, DataTypes) => {
    let alias = "Carrito";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          productId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        }
    
    let config = {
        tableName: "cart",
        timestamps:false
    }

const Carrito = sequelize.define(alias, cols, config)

Carrito.associate = function(models){
    Carrito.belongsTo(models.Usuario, {
        as: "usuarios",
        foreignKey: "userId"
    })}

return Carrito
}



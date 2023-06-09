module.exports = (sequelize, dataTypes) => {
    let alias = "Order";
    let cols = {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // userId: {
      //   type: dataTypes.INTEGER(11),
      //   allowNull: false,
      // },
      total: {
        type: dataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      paymentMethod: {
        type: dataTypes.STRING(25),
        allowNull: false,
      },
      shippingMethod: {
        type: dataTypes.STRING(25),
        allowNull: true,
      },
    };
    let config = {
        tableName: "orders",
        timestamps:false
    };
  
    const Order = sequelize.define(alias, cols, config);
  
    Order.associate = (models) => {
      Order.Usuario = Order.belongsTo(models.Usuario, {
        as: "user",
        foreignKey: "userId",
      });
      Order.OrderItems = Order.hasMany(models.OrderItem, {
        as: "orderItems",
      });
    };
  
    return Order;
  };
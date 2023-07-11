const { validationResult } = require("express-validator");
const db = require('../database/models');
const { Association } = require("sequelize");

const cartController = {
        addToCart: async (req, res) => {
          try {
            const { productId, quantity, price } = req.body;
            const userId = req.user.id; // Suponiendo que tienes un middleware para autenticar al usuario
      
            // Crear un nuevo item en el carrito
            const cartItem = await Cart.create({
              productId,
              quantity,
              price,
              userId
            });
      
            res.status(200).json({ success: true, message: 'Producto agregado al carrito' });
          } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Error al agregar el producto al carrito' });
          }
        },
      
        getCartItems: async (req, res) => {
          try {
            const userId = req.user.id; // Suponiendo que tienes un middleware para autenticar al usuario
      
            // Obtener los productos en el carrito del usuario
            const cartItems = await Cart.findAll({
              where: { userId },
              include: 'Product' // Asegúrate de tener una relación "belongsTo" con el modelo de productos en tu modelo de carrito
            });
      
            res.status(200).json({ success: true, cartItems });
          } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Error al obtener los productos del carrito' });
          }
        },
      
        checkout: async (req, res) => {
          try {
            const userId = req.user.id; // Suponiendo que tienes un middleware para autenticar al usuario
      
            // Realizar las operaciones necesarias para procesar el pago, actualizar el stock, generar factura, etc.
      
            // Eliminar los productos del carrito después de la compra
            await Cart.destroy({ where: { userId } });
      
            res.status(200).json({ success: true, message: 'Compra realizada con éxito' });
          } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Error al realizar la compra' });
          }
        }
      }

module.exports = cartController;
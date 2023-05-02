module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name:{
            type: dataTypes.STRING
        },
        name_lastname:{
            type: dataTypes.STRING

        },
        emial:{
            type: dataTypes.INTEGER

        },
        country:{
            type: dataTypes.STRING

        },
        direction: {
            type: dataTypes.INTEGER
        },
        avatar:{
            type: dataTypes.STRING

        },
        admin: {
            type: dataTypes.INTEGER
        },
        password:{
            type: dataTypes.STRING

        },
        conditions: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tablename:"users",
        timestamps:false
    }

const Usuario = sequelize.define(alias, cols, config)
Usuario.associate = function(models){
    Usuario.hasMany(models.Producto, {
        as: "cart",
        foreignKey: "cart_id"
    })
    
}
return Usuario

}

module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name_lastname:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email:{
            type: dataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        country:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        direction: {
            type: dataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        avatar:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        admin: {
            type: dataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        password:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        conditions: {
            type: dataTypes.INTEGER,
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

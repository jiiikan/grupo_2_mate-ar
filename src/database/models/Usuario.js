module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_user:{
            type: dataTypes.STRING
        },
        nombre_apellido:{
            type: dataTypes.STRING

        },
        email:{
            type: dataTypes.STRING

        },
        domicilio:{
            type: dataTypes.STRING

        },
        contraseña: {
            type: dataTypes.STRING
        },
        admin: {
            type: dataTypes.BOOLEAN
        },
        avatar: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tablename: "usuarios",
        timestamps:false
    }

const Usuario = sequelize.define(alias, cols, config)
return Usuario

}

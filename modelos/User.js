const fs = require('fs');

const User = {
	fileName: './data/users.json',

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},

	findAll: function () {
		return this.getData();
	},

	findByPk: function (id) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser.id === id);
		return userFound;
	},

	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},

	create: function (req, res) {
        const { nombre_user, nombre_apellido, email, pais, domicilio, admin, contraseña, avatar } = req.body;
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
            nombre_user: req.body.nombre_usuario,
            nombre_apellido: req.body.nombre_apellido,
            email: req.body.email,
            pais: req.body.pais,
            domicilio: req.body.domicilio,
            admin:req.body.permisos,
            contraseña: req.body.contraseña,
            avatar: req.file.filename
		}
		allUsers.push(newUser);
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},

	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
		return true;
	}
}

module.exports = User;
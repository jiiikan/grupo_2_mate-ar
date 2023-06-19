const db = require('../database/models');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.remember;

	if (emailInCookie) {
		db.Usuario.findOne({
			where: { email: emailInCookie }
		})
			.then(userFromCookie => {
				if (userFromCookie) {
					req.session.userLogged = userFromCookie;
				}

				if (req.session.userLogged) {
					res.locals.isLogged = true;
					res.locals.userLogged = req.session.userLogged;
				} else {
					res.clearCookie("remember");
				}

				next();
			})
			.catch(error => {
				console.log("Error al buscar el usuario", error)
				next();
			});
	} else {
		next();
	}
}

module.exports = userLoggedMiddleware;

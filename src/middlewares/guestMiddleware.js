function guestMiddleware(req, res, next) {
	if (req.session && req.session.userLogged) {
		return res.redirect('/users/perfil');
	}
	next();
}


module.exports = guestMiddleware;

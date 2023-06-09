const db = require("../database/models");
const Users = db.Usuario;

sessionMiddleware = async (req, res, next) => {
  res.locals.userFound = false;
  let userFromCookie;

  if (req.session && req.session.userLogged) {
    res.locals.userFound = true;
    res.locals.userLogged = req.session.userLogged;
    if (req.session.userLogged.id <= 4) {
      res.locals.userAdmin = true;
    }
  } else {
    if (req.cookies.remember) {
      userFromCookie = await Users.findOne({
        where: { id: req.cookies.remember},
      });
    }

    if (userFromCookie) {
      res.locals.userFound = true;
      res.locals.userLogged = req.session.userLogged = userFromCookie;
    }
  }

  next();
};

module.exports = sessionMiddleware;
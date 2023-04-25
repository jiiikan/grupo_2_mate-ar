function userLogged(req, res, next) {
    res.locals.isLogged = false;
    
    next()

}   

module.exports = userLogged
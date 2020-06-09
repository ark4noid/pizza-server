module.exports = async (req, res, next) => {
  // TODO: comprobar si el token de auth es valido
  // si no es valido 401
  // si es valido grabar el usuario en req.$ y next
  next();
}
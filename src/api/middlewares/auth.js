module.exports = async (req, res, next) => {
  const {jwt, config} = req.$;
  const {authSecret} = config.authorization;
  // 1. Leer el header Authorization
  const authorization = req.get('Authorization');
  // 2. Comprobar que sea de tipo Beaerer
  const isBearer = authorization && authorization.startsWith('Bearer ');
  // 3. Si no hay authorization bearer -> 401 y salimos
  if(!isBearer){
    res.status(401).end();
    return;
  }
  // 4. Conseguir el token
  const authToken = authorization.split(' ')[1];
  // 5. Validar el token
  let payload;
  try {
    payload = await jwt.verify(authToken, authSecret);
  } catch(err){
    // 6. Si el token no esta ok -> 401 y salimos
    res.status(401).end();
    return;
  }
  // 7. guardar el user en req.$ para saber que usario hace la peticion y siguiente
  req.$.user = payload.user;
  next(); 
}

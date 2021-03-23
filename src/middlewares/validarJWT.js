const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  // Para pedirlo es en x-token en el header -postman-
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;


  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
    req.uid
  }

  next();
};

module.exports = {
  validarJWT,
};

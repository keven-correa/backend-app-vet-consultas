const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con este correo",
      });
    }

    usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //Generar JWT

    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Usuario ya existe!",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    //confirmar password
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return status(400).json({
        ok: false,
        msg: "password incorrecto",
      });
    }

    //Generar JWT

    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {

  const {uid, name} = req;

    //generar JWT
    const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};

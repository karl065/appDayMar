const {Usuarios, Pedidos, Ventas} = require('../DB.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');
const {SECRETA} = process.env;

const authenticateUser = async (email, password) => {
  try {
    const user = await Usuarios.findOne({
      where: {
        email: {
          [Op.iLike]: email,
        },
      },
      include: [
        {model: Pedidos, as: 'pedido'},
        {
          model: Ventas,
          as: 'ventas',
        },
      ],
    });

    if (!user) {
      throw new Error('Email o Contraseña incorrectos');
    }

    const passwordValid = await bcryptjs.compare(password, user.password);

    if (!passwordValid) {
      throw new Error('Email o Contraseña incorrectos');
    }

    const payload = {
      user: {id: user.idUser},
    };

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        SECRETA,
        {
          expiresIn: '30d',
        },
        (err, token) => {
          if (err) {
            reject({msg: 'Error al crear el Token'});
          }
          const auth = {
            token,
            id: user.idUser,
            email: user.email,
            rol: user.rol,
          };
          resolve(auth);
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticateUser,
};

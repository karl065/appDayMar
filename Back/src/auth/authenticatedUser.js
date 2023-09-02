const {Usuarios, Pedidos, Ventas} = require('../DB.js');

const authenticatedUser = async (idUser) => {
  try {
    const user = await Usuarios.findByPk(idUser, {
      include: [
        {model: Pedidos, as: 'pedido'},
        {
          model: Ventas,
          as: 'ventas',
        },
      ],
    });

    if (!user) throw new Error('User not found');

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {authenticatedUser};

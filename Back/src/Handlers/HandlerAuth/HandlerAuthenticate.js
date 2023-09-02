const {authenticateUser} = require('../../auth/authenticateUser');

/**
 * La función `handlerAuthenticate` es una función asíncrona que maneja la autenticación del usuario al
 * recibir un correo electrónico y una contraseña del cuerpo de la solicitud, llamar a la función
 * `authenticateUser` para autenticar al usuario y luego responder con un token si tiene éxito o un
 * error si no tiene éxito.
 * @param req - El parámetro `req` es un objeto que representa la solicitud HTTP realizada por el
 * cliente. Contiene información como los encabezados de la solicitud, el cuerpo de la solicitud, el
 * método de la solicitud, la URL de la solicitud y otros detalles relevantes.
 * @param res - El parámetro `res` es el objeto de respuesta que se usa para enviar la respuesta al
 * cliente. Contiene métodos y propiedades que le permiten establecer el código de estado, los
 * encabezados y enviar el cuerpo de la respuesta. En este fragmento de código, se usa para enviar una
 * respuesta JSON con un código de estado
 */
const handlerAuthenticate = async (req, res) => {
  try {
    const {email, password} = req.body;
    const token = await authenticateUser(email, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({error: error.message});
  }
};

module.exports = {handlerAuthenticate};

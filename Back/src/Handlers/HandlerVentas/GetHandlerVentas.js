const {
  getAllVentasController,
  getVentasIdController,
} = require('../../Controllers/ControllersVentas/GetControllersVentas');

const getHandlerVentas = async (req, res) => {
  try {
    const venta = await getAllVentasController();
    return res.status(200).json(venta);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

const getHandlerVentasID = async (req, res) => {
  try {
    const {id} = req.params;
    const venta = await getVentasIdController(id);
    return res.status(200).json(venta);
  } catch (error) {
    return res.status(500).json({error});
  }
};

module.exports = {getHandlerVentas, getHandlerVentasID};

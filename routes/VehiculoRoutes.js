const VehiculoController = require('../controllers/VehiculoController');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/vehiculo/:id', VehiculoController.getAllByUserIdVehiculos);
    app.get('/vehiculo/:id/tipo', VehiculoController.getAllByUserIdVehiculosTipo);
    app.post('/vehiculo',  VehiculoController.createvehiculo);
    app.delete('/vehiculo/:id', VehiculoController.deletedVehiculo);
}


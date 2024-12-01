const VehiculoController = require('../controllers/VehiculoController');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/vehiculo/:id', auth.authenticate,VehiculoController.getAllByUserIdVehiculos);
    app.get('/vehiculo/:id/tipo', auth.authenticate,VehiculoController.getAllByUserIdVehiculosTipo);
    app.post('/vehiculo', auth.authenticate, VehiculoController.createvehiculo);
    app.delete('/vehiculo/:id', auth.authenticate,VehiculoController.deletedVehiculo);
}


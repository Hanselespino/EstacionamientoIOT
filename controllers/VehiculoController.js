const Vehiculo = require("../models/Vehiculos");

exports.createvehiculo = async(req, res) =>{
    try{
        console.log('Se ejecuto createvehiculo');
        if (!req.body.tipo) {
            return res.status(400).send('Todos los campos son obligatorios: tipo.');
        }


        const userId = req.user.id;


        const vehiculo = new Vehiculo({
            tipo: req.body.tipo,
            usuario:userId
        });

        const vehiculoGuardado = await vehiculo.save();
        console.log('Se ejecuto vehiculo.save');
        res.status(200).send(vehiculoGuardado);
    }catch(err){
        console.log('Error en createVehiculo: ',err);
        res.status(500).send('Error en el servidor');
    }
}



exports.getAllByUserIdVehiculos = async (req, res) => {
    try {
        const { id } = req.params;

        const cantidadVehiculos = await Vehiculo.countDocuments({ usuario: id });

        res.status(200).send({ cantAct: cantidadVehiculos });
        
    } catch (err) {
        console.log('Error en getAllByUserIdVehiculos: ', err);
        res.status(500).send('Error en el servidor');
    }
}


exports.getAllByUserIdVehiculosTipo = async (req, res) => {
    try {
        const { id } = req.params;

        const tipo = 'Entrada';
        
        const cantidadVehiculos = await Vehiculo.countDocuments({ usuario: id, tipo:tipo});

        res.status(200).send({ cantAct: cantidadVehiculos });
        
    } catch (err) {
        console.log('Error en getAllByUserIdVehiculos: ', err);
        res.status(500).send('Error en el servidor');
    }
}



exports.deletedVehiculo = async (req, res) => {
    try {

        const { id } = req.params;

        const tipo = 'Entrada';  

        const deletedVehiculo = await Vehiculo.deleteOne({usuario:id, tipo: tipo });

        if (deletedVehiculo.deletedCount > 0) {
            res.status(200).send('Vehículo eliminado exitosamente');
        } else {
            res.status(400).send('No se encontró un vehículo con el tipo enviado');
        }
    } catch (err) {
        console.log('Error en deletedVehiculo: ', err);
        res.status(500).send('Error en el servidor');
    }
}
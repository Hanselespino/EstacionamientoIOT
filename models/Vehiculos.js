const mongoose = require('mongoose');

const schemaVehiculo = new mongoose.Schema({
    tipo: String,
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Vehiculo = mongoose.model('Vehiculo',schemaVehiculo);

module.exports = Vehiculo;
const mongoose = require('mongoose');
const express = require('express');
const AuthRoutes = require('./routes/AuthRoutes');
const VehiculoRoutes = require('./routes/VehiculoRoutes')



mongoose.connect('mongodb://localhost:27017/EstacionamientoIOT')
.then(() => {
    console.log('Conectado a MongoDB');
}  )
.catch( (err) =>{
    console.log('Error conectando a MongoDB: ', err);
} );


const app = express();
app.use(express.json());




AuthRoutes(app);
VehiculoRoutes(app);


app.listen(3000, ()=>{
    console.log('El servidor inicio en el puerto 3000');
});
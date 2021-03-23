const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
const app = express();

//base de datos
dbConnection();

// CORS
app.use(cors())

//lectura
app.use(express.json())

//Rutas
//Rutas aut, crear, login, renew
app.use('/api/auth', require('./routes/auth.routes'));
//CRUD: Consultas
app.use('/api/consultas', require('./routes/consultas.routes'));

app.listen(process.env.PORT, () =>{
    console.log('Servidor en puerto ', process.env.PORT)
});
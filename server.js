const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const router = require('./app/controllers/router');

// Configura Express
const app = express();
app.use(cors());

// Agrega middleware para analizar solicitudes con cuerpo en formato JSON
app.use(express.json());

let mongoConnection = "mongodb+srv://admin:admin@cluster0.dwmdwry.mongodb.net/Cluster0";
let db = mongoose.connection;

// Middleware for global router
app.use(router);


// Express setting for static files at staticPath
const staticPath = path.join(__dirname, 'app', 'views');
app.use(express.static(staticPath));
app.use('/controllers', express.static('app/controllers'));
app.use('/data', express.static(path.join(__dirname, 'app', 'data')));

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto http://localhost:${port}`);
});
  
//coneccion
db.on("connecting", () => {
console.log("Conectando...");
});

db.on("connected", () => {
console.log(" ¡Conectado exitosamente!");
console.log (mongoose.connection.readyState); //State 1: Connected
console.log("Coneccion exitosa a mongo");
});


mongoose.connect (mongoConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

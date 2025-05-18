const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const db = require('./app/database/database');

// Rutas
const warriorRoutes = require('./app/routes/warriors');
const powerRoutes = require('./app/routes/powers');
const spellRoutes = require('./app/routes/spells');
const warriorPowersRoutes = require('./app/routes/warriorPowers');
const warriorSpellRoutes = require('./app/routes/warriorSpells');
const userRoutes = require("./app/routes/users");
const raceRoutes = require("./app/routes/race");
const warriorTypeRoutes = require("./app/routes/warriorType");
const battleRoutes = require("./app/routes/battle");
const partidaRoutes = require("./app/routes/partidas");

// Socket logic
const partidaSocketHandler = require('./app/sockets/partidasSocket');
const gameSocketHandler = require('./app/sockets/gameSocket');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/assets', express.static('app/assets'));
app.use(express.static("app/views"));


// Rutas
app.use('/warriors', warriorRoutes);
app.use('/powers', powerRoutes);
app.use('/spells', spellRoutes);
app.use('/battles', battleRoutes);
app.use('/warriorPowers', warriorPowersRoutes);
app.use('/warriorSpells', warriorSpellRoutes);
app.use('/api/users', userRoutes);
app.use('/races', raceRoutes);
app.use('/warrior_type', warriorTypeRoutes);
app.use('/partida', partidaRoutes);


//Conexión Socket.io
io.on('connection', (socket) => {
    console.log('🟢 Usuario conectado:', socket.id);
    partidaSocketHandler(io, socket, db);
    gameSocketHandler(io, socket, db);
});

// Iniciar servidor
server.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});


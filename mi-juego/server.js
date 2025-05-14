const express = require('express');
const http = require('http'); // para usar con socket.io
const cors = require('cors');
const socketIo = require('socket.io');
const db = require('./app/database/database');

const warriorRoutes = require('./app/routes/warriors');
const powerRoutes = require('./app/routes/powers');
const spellRoutes = require('./app/routes/spells');
const warriorPowersRoutes = require('./app/routes/warriorPowers');
const warriorSpellRoutes = require('./app/routes/warriorSpells');
const userRoutes = require("./app/routes/users.js");
const raceRoutes = require("./app/routes/race.js");
const warriorTypeRoutes = require("./app/routes/warriorType");
const battleRoutes = require("./app/routes/battle.js");
const partidaRoutes = require("./app/routes/partidas.js");

const app = express();
const server = http.createServer(app); // Servidor HTTP
const io = socketIo(server); // Inicializar socket.io con el servidor

const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Archivos estáticos
app.use('/assets', express.static('app/assets'));
app.use(express.static("app/views"));

// Rutas
app.use('/warriors', warriorRoutes);
app.use('/powers', powerRoutes);
app.use('/spells', spellRoutes);
app.use("/battles", battleRoutes);
app.use('/warriorPowers', warriorPowersRoutes);
app.use('/warriorSpells', warriorSpellRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/loginUser", userRoutes);
app.use("/races", raceRoutes);
app.use("/warrior_type", warriorTypeRoutes);
app.use("/partida", partidaRoutes);

// Socket.io (ejemplo de conexión)
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Iniciar servidor
server.listen(port, () => {
  console.log(`Servidor corriendo con Socket.io en http://localhost:${port}`);
});

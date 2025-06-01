const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');


const db = require('./app/database/database');


const path = require('path');
const { authenticateToken, authorizeRole } = require('./app/middleware/authMiddleware');



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
const roleRoutes = require("./app/routes/roles");
const moduleRoutes = require("./app/routes/modules");
const PermissionRoutes = require("./app/routes/permissions");
const UserRoleRoutes = require("./app/routes/UserRole");
const RMPRoutes = require("./app/routes/roleModuloPermissions");

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

//PROTEGER LAS RUTAS 
app.get('/views/UserTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'UserTable.html'));
});

app.get('/views/BattleTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'BattleTable.html'));
});

app.get('/views/modulesTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'modulesTable.html'));
});

app.get('/views/PartidasTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'PartidasTable.html'));
});

app.get('/views/PermissionsTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'PermissionsTable.html'));
});

app.get('/views/PowerTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'PowerTable.html'));
});

app.get('/views/RaceTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'RaceTable.html'));
});

app.get('/views/RMPTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'RMPTable.html'));
});

app.get('/views/RolesTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'RolesTable.html'));
});

app.get('/views/SpellsTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'SpellsTable.html'));
});

app.get('/views/userRoleTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'userRoleTable.html'));
});

app.get('/views/WarriorPowerTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'WarriorPowerTable.html'));
});
app.get('/views/WarriorSpellsTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'WarriorSpellsTable.html'));
});
app.get('/views/WarriorTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'WarriorTable.html'));
});
app.get('/views/WarriorTypeTable.html', authenticateToken, authorizeRole('Administrador'), (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'views', 'WarriorTypeTable.html'));
});






app.use('/assets', express.static(path.join(__dirname, 'app', 'assets')));
app.use('/views', express.static(path.join(__dirname, 'app', 'views')));
app.use('/public', express.static(path.join(__dirname, 'app', 'public')));
app.use('/views', express.static(path.join(__dirname, 'app', 'public', 'views')));



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
app.use('/roles', roleRoutes);
app.use('/modules', moduleRoutes);
app.use('/permissions', PermissionRoutes);
app.use('/userRoles', UserRoleRoutes);
app.use('/rmp', RMPRoutes);








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
//Ejecutar el servicio asi-->
//http://localhost:3000/views/login.html
//http://localhost:3000/views/PartidasTable.html



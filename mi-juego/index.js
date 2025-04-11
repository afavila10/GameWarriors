const express = require('express');
const cors = require('cors');
//const bodyParser = require("body-parser");
const db = require('./app/database/database');

const warriorRoutes= require('./app/routes/warriors') // Importamos las rutas de Spells
const powerRoutes = require('./app/routes/powers.js');// Importamos las rutas de Spells
const spellRoutes = require('./app/routes/spells'); // Importamos las rutas de Spells
const warriorPowersRoutes = require('./app/routes/warriorPowers'); //importamos las rutas de warriorPowers
const warriorSpellRoutes = require('./app/routes/warriorSpells');//importamos las rutas de warriorSpells
const userRoutes = require("./app/routes/users.js");
const raceRoutes = require("./app/routes/race.js");
const warriorTypeRoutes = require("./app/routes/warriorType");
const battleRoutes= require("./app/routes/battle.js")



/**--------------------------------------------------- */

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json()); // Middleware para manejar JSON

app.use(cors());


app.use('/assets', express.static('app/assets'));
app.use('/warriors',warriorRoutes); // Usa las rutas de guerreros
app.use('/powers', powerRoutes); // Rutas de Powers
app.use('/spells', spellRoutes); // Rutas de Spells
app.use("/battles",battleRoutes);//rutas de battalas
app.use('/warriorPowers', warriorPowersRoutes);// rutas de warrior_Powers
app.use('/warriorSpells', warriorSpellRoutes); // Se asocian las rutas de hechizos
app.use("/api/users", userRoutes);//rutas de users
app.use("/api/users/loginUser", userRoutes);//rutas de login
app.use("/races", raceRoutes);//rutas de razas
app.use("/warrior_type", warriorTypeRoutes);//rutas tipos guerreros



app.use(express.static("views"));


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


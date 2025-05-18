const db = require('../database/database');

// Obtener todos los hechizos relacionados con tipos de guerrero
/*const getAllWarriorSpells = (callback) => {
    const query = `
        SELECT ws.type_id, s.spell_id, s.name, s.percentage 
        FROM WARRIOR_TYPE ws
        JOIN SPELLS s ON ws.type_id = s.spell_id
    `;
    db.all(query, [], callback);
};*/
const getAllWarriorSpells = (callback) => {
    const query = `
        SELECT ws.warriorSpellsId AS id, ws.warrior_id, ws.spell_id, s.name AS spell_name, s.percentage
        FROM WARRIOR_SPELLS ws
        JOIN SPELLS s ON ws.spell_id = s.spell_id
    `;
    db.all(query, [], callback);
};


// Obtener hechizos de un guerrero por ID
const getSpellsByWarriorId = (warrior_id, callback) => {
    const query = `
        SELECT ws.warrior_id, s.spell_id, s.name, s.percentage 
        FROM WARRIOR_SPELLS ws
        JOIN SPELLS s ON ws.spell_id = s.spell_id
        WHERE ws.warrior_id = ?;
    `;
    db.all(query, [warrior_id], callback);
};

// Asignar un hechizo a un guerrero
const assignSpellToWarrior = (warrior_id, spell_id, callback) => {
    const query = `
        INSERT INTO WARRIOR_SPELLS (warrior_id, spell_id) VALUES (?, ?)
    `;
    db.run(query, [warrior_id, spell_id], callback);
};

// Actualizar un hechizo asignado a un guerrero
const updateSpellsWarrior = (warrior_id, old_spell_id, new_spell_id, callback) => {
    const query = `
        UPDATE WARRIOR_SPELLS 
        SET spell_id = ? 
        WHERE warrior_id = ? AND spell_id = ?
    `;
    db.run(query, [new_spell_id, warrior_id, old_spell_id], callback);
};



// Eliminar un hechizo de un guerrero
const removeWarriorSpell = (warrior_id, spell_id, callback) => {
    const query = `
        DELETE FROM WARRIOR_SPELLS WHERE warrior_id = ? AND spell_id = ?
    `;
    db.run(query, [warrior_id, spell_id], callback);
};

module.exports = {
    getAllWarriorSpells,
    getSpellsByWarriorId,
    assignSpellToWarrior,
    updateSpellsWarrior,
    removeWarriorSpell
};

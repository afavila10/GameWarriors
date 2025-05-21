document.addEventListener('DOMContentLoaded', () => {
    const WarriorSpellsTableBody = document.getElementById('WarriorSpellsTableBody');
    const editWarriorSpellsForm = document.getElementById('editWarriorSpellsForm');

    // Cargar perfiles al cargar la página
    fetchWarriorSpells();

    async function fetchWarriorSpells() {
        try {
            const res = await fetch('http://localhost:3000/warriorSpells');
            const data = await res.json();
            renderWarriorSpells(data);
        } catch (error) {
            console.error('Error al obtener WarriorSpells:', error);
        }
    }

    function renderWarriorSpells(WarriorSpells) {
        WarriorSpellsTableBody.innerHTML = '';
        WarriorSpells.forEach(WarriorSpell => {
            WarriorSpellsTableBody.innerHTML += `
          <tr>
            <td>${WarriorSpell.id}</td>
            <td>${WarriorSpell.warrior_id}</td>
            <td>${WarriorSpell.spell_id}</td>
            <td>${WarriorSpell.spell_name}</td>
            <td>${WarriorSpell.percentage}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(WarriorSpell)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showWarriorSpells(${WarriorSpell.id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteWarriorSpells(${WarriorSpell.warrior_id}, ${WarriorSpell.spell_id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (WarriorSpells) => {
        document.getElementById('editWarriorSpellsId').value = WarriorSpells.id;
        document.getElementById('editOldSpellId').value = WarriorSpells.old_spell_id;
        document.getElementById('editNewSpellId').value = WarriorSpells.new_spell_id;
        //document.getElementById('editSpellsName').value = WarriorSpells.name;
        //document.getElementById('editSpellsPercentage').value = WarriorSpells.percentage;

        const modal = new bootstrap.Modal(document.getElementById('editWarriorSpellsModal'));
        modal.show();
    };

    // Enviar edición
    editWarriorSpellsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editWarriorSpellsId').value;
        console.log('ID que se va a editar:', id);

        const updatedWarriorSpells = {
            warrior_id: document.getElementById('editWarriorId').value,
            old_spell_id: document.getElementById('editOldSpellId').value,
            new_spell_id: document.getElementById('editNewSpellId').value,
        };
        console.log('Datos enviados:', updatedWarriorSpells);

        try {

            const res = await fetch(`http://localhost:3000/warriorSpells/update-spell/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedWarriorSpells)
            });

            if (res.ok) {
                fetchWarriorSpells();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editWarriorSpellsModal')).hide();
            } else {
                console.error('Error al editar WarriorSpells');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteWarriorSpells = async (warrior_id, spell_id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este WarriorSpells?')) return;

        try {
            const res = await fetch(`http://localhost:3000/warriorSpells/${warrior_id}/${spell_id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchWarriorSpells();
            } else {
                console.error('Error al eliminar WarriorSpells');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    //ver detalles 
    window.showWarriorSpells= async function (id) {
    try {
        console.log("Obteniendo detalles del warrior Spells con ID:", id);
        const res = await fetch(`http://localhost:3000/warriorSpells/${id}`);
        if (!res.ok) throw new Error("The warrior could not be retrieved.");
        const WarriorSpells = await res.json();
        const WarriorSpell = WarriorSpells[0]; // Accede al primer elemento
       

        // Asigna los datos al modal (usa exactamente los mismos nombres)
        
        document.getElementById("viewWarriorSpellWarriorId").textContent = WarriorSpell.warrior_id;
        document.getElementById("viewWarriorSpellPowerId").textContent = WarriorSpell.spell_id;
        document.getElementById("viewWarriorSpellName").textContent = WarriorSpell.name;
        document.getElementById("viewWarriorSpellPercentage").textContent = WarriorSpell.percentage;
    

        // Muestra el modal
        document.activeElement.blur(); // evita error de aria-hidden
        const modal = new bootstrap.Modal(document.getElementById("viewWarriorSpellModal"));
        modal.show();
        } catch (error) {
            console.error("Error loading warrior  spells details:", error);
            alert("There was a problem loading the warrior spell details.");
        }
    };

    //Modal
    document.getElementById("createWarriorSpellsForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const warrior_id = document.getElementById("createWarriorId").value.trim();
        const spell_id = document.getElementById("createSpellId").value.trim();



        // Validación básica
        if (!warrior_id || !spell_id) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/warriorSpells", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    warrior_id,
                    spell_id
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("WarriorSpells creado correctamente");
                document.getElementById("createWarriorSpellsForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createWarriorSpellsModal"));
                modal.hide();
                await fetchWarriorSpells(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un spell: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



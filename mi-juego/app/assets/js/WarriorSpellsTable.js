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
            <td>${WarriorSpell.type_id}</td>
            <td>${WarriorSpell.warrior_id}</td>
            <td>${WarriorSpell.spell_id}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(WarriorSpell)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteWarriorSpells(${WarriorSpell.type_id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (WarriorSpells) => {
        document.getElementById('editWarriorSpellsId').value = WarriorSpells.type_id;
        document.getElementById('editWarriorWarriorId').value = WarriorSpells.spell_id;
        document.getElementById('editWarriorSpellsTypeId').value = WarriorSpells.spell_id;
        
        const modal = new bootstrap.Modal(document.getElementById('editWarriorSpellsModal'));
        modal.show();
    };

    // Enviar edición
    editWarriorSpellsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editWarriorSpellsId').value;

        const updatedWarriorSpells = {
            warrior_id: document.getElementById('editWarriorSpellsTypeId').value,
            spell_id: document.getElementById('editWarriorSpellsName').value
            
        };

        try {

            const res = await fetch(`http://localhost:3000/warrior_type/${id}`, {
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
    window.deleteWarriorSpells = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este WarriorSpells?')) return;

        try {
            const res = await fetch(`http://localhost:3000/warriorSpells/${id}`, {
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

    //Modal
    document.getElementById("createWarriorSpellsForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const spell_id = document.getElementById("createSpellId").value.trim();
        const name = document.getElementById("createName").value.trim();
        


        // Validación básica
        if (!name || !description ) {
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

                    name,
                    description,
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



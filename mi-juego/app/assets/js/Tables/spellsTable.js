document.addEventListener('DOMContentLoaded', () => {
    const spellsTableBody = document.getElementById('spellsTableBody');
    const editSpellsForm = document.getElementById('editSpellsForm');

    // Cargar perfiles al cargar la página
    fetchSpells();

    async function fetchSpells() {
        try {
            const res = await fetch('http://localhost:3000/spells');
            const data = await res.json();
            renderSpells(data);
        } catch (error) {
            console.error('Error al obtener spells:', error);
        }
    }

    function renderSpells(spells) {
        spellsTableBody.innerHTML = '';
        spells.forEach(spell => {
            spellsTableBody.innerHTML += `
          <tr>
            <td>${spell.spell_id}</td>
            <td>${spell.name}</td>
            <td>${spell.description}</td>
            <td>${spell.percentage}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(spell)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showSpells(${spell.spell_id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteSpells(${spell.spell_id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (spell) => {
        document.getElementById('editSpellsId').value = spell.spell_id;
        document.getElementById('editSpellsName').value = spell.name;
        document.getElementById('editSpellsDescription').value = spell.description;
        document.getElementById('editSpellsPercentage').value = spell.percentage;
        const modal = new bootstrap.Modal(document.getElementById('editSpellsModal'));
        modal.show();
    };

    // Enviar edición
    editSpellsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editSpellsId').value;

        const updatedSpells = {
            name: document.getElementById('editSpellsName').value,
            description: document.getElementById('editSpellsDescription').value,
            percentage: document.getElementById('editSpellsPercentage').value,
        };

        try {

            const res = await fetch(`http://localhost:3000/spells/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSpells)
            });

            if (res.ok) {
                fetchSpells();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editSpellsModal')).hide();
            } else {
                console.error('Error al editar spells');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteSpells = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este spells?')) return;

        try {
            const res = await fetch(`http://localhost:3000/spells/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchSpells();
            } else {
                console.error('Error al eliminar spells');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    //ver detalles 
    window.showSpells= async function (id) {
    try {
        console.log("Obteniendo detalles del spells con ID:", id);
        const res = await fetch(`http://localhost:3000/spells/${id}`);
        if (!res.ok) throw new Error("The warrior could not be retrieved.");
        const spell = await res.json();
        
        // Asigna los datos al modal (usa exactamente los mismos nombres)
        document.getElementById("viewSpellId").textContent = spell.spell_id;
        document.getElementById("viewSpellName").textContent = spell.name;
        document.getElementById("viewSpellDescription").textContent = spell.description;
        document.getElementById("viewSpellPercentage").textContent = spell.percentage;

        // Muestra el modal
        document.activeElement.blur(); // evita error de aria-hidden
        const modal = new bootstrap.Modal(document.getElementById("viewSpellsModal"));
        modal.show();
        } catch (error) {
            console.error("Error loading spells details:", error);
            alert("There was a problem loading the spells details.");
        }
    };

    //Modal
    document.getElementById("createSpellsForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("createName").value.trim();
        const description = document.getElementById("createDescription").value.trim();
        const percentage = document.getElementById("createPercentage").value.trim();

        // Validación básica
        if (!name || !description || !percentage) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/spells", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    percentage
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("spells creado correctamente");
                document.getElementById("createSpellsForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createSpellsModal"));
                modal.hide();
                await fetchSpells(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un spell: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



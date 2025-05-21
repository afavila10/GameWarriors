document.addEventListener('DOMContentLoaded', () => {
    const racesTableBody = document.getElementById('racesTableBody');
    const editRacesForm = document.getElementById('editRacesForm');

    // Cargar perfiles al cargar la página
    fetchRaces();

    async function fetchRaces() {
        try {
            const res = await fetch('http://localhost:3000/races');
            const data = await res.json();
            renderRaces(data);
        } catch (error) {
            console.error('Error al obtener races:', error);
        }
    }

    function renderRaces(races) {
        racesTableBody.innerHTML = '';
        races.forEach(race => {
            racesTableBody.innerHTML += `
          <tr>
            <td>${race.race_id}</td>
            <td>${race.name}</td>
            <td>${race.description}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(race)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showRaces(${race.race_id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteRaces(${race.race_id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (race) => {
        document.getElementById('editRacesId').value = race.race_id;
        document.getElementById('editRacesName').value = race.name;
        document.getElementById('editRacesDescription').value = race.description;
        const modal = new bootstrap.Modal(document.getElementById('editRacesModal'));
        modal.show();
    };

    // Enviar edición
    editRacesForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editRacesId').value;

        const updatedRaces = {
            name: document.getElementById('editRacesName').value,
            description: document.getElementById('editRacesDescription').value
        };

        try {

            const res = await fetch(`http://localhost:3000/races/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedRaces)
            });

            if (res.ok) {
                fetchRaces();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editRacesModal')).hide();
            } else {
                console.error('Error al editar races');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteRaces = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este races?')) return;

        try {
            const res = await fetch(`http://localhost:3000/races/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchRaces();
            } else {
                console.error('Error al eliminar races');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };


    //ver detalles 
    window.showRaces= async function (id) {
    try {
        console.log("Obteniendo detalles de races con ID:", id);
        const res = await fetch(`http://localhost:3000/races/${id}`);
        if (!res.ok) throw new Error("The warrior could not be retrieved.");
        const race = await res.json();
        //const WarriorSpell = WarriorSpells[0]; // Accede al primer elemento
       

        // Asigna los datos al modal (usa exactamente los mismos nombres)
        document.getElementById("viewRaceId").textContent = race.race_id;
        document.getElementById("viewRaceName").textContent = race.name;
        document.getElementById("viewRaceDescription").textContent = race.description;

        // Muestra el modal
        document.activeElement.blur(); // evita error de aria-hidden
        const modal = new bootstrap.Modal(document.getElementById("viewRaceModal"));
        modal.show();
        } catch (error) {
            console.error("Error loading race details:", error);
            alert("There was a problem loading the races details.");
        }
    };

    //Modal
    document.getElementById("createRacesForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("createName").value.trim();
        const description = document.getElementById("createDescription").value.trim();


        // Validación básica
        if (!name || !description ) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/races", {
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
                alert("races creado correctamente");
                document.getElementById("createRacesForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createRacesModal"));
                modal.hide();
                await fetchRaces(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un spell: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



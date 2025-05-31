document.addEventListener('DOMContentLoaded', () => {
    const WarriorPowersTableBody = document.getElementById('WarriorPowersTableBody');
    const editWarriorPowersForm = document.getElementById('editWarriorPowersForm');

    // Cargar perfiles al cargar la página
    fetchWarriorPowers();

    async function fetchWarriorPowers() {
        try {
            const res = await fetch('http://localhost:3000/warriorPowers');
            const data = await res.json();
            renderWarriorPowers(data);
        } catch (error) {
            console.error('Error al obtener WarriorPowers:', error);
        }
    }

    function renderWarriorPowers(WarriorPowers) {
        WarriorPowersTableBody.innerHTML = '';
        WarriorPowers.forEach(warriorPower => {
            WarriorPowersTableBody.innerHTML += `
          <tr>
            <td>${warriorPower.id}</td>
            <td>${warriorPower.warrior_id}</td>
            <td>${warriorPower.warriorName}</td>
            <td>${warriorPower.power_id}</td>
            <td>${warriorPower.name}</td>
            <td>${warriorPower.percentage}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(warriorPower)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showWarriorPowers(${warriorPower.id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteWarriorPowers(${warriorPower.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (WarriorPower) => {
        document.getElementById('editWarriorPowerId').value = WarriorPower.id;
        //document.getElementById('editWarriorWarriorId').value = WarriorPower.warrior_id;
        /*document.getElementById('editPowerName').value = WarriorPower.name;
        document.getElementById('editPowerPercentage').value = WarriorPower.percentage;*/

        const modal = new bootstrap.Modal(document.getElementById('editWarriorPowersModal'));
        modal.show();
    };


    // Enviar edición
    editWarriorPowersForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editWarriorPowerId').value;
        console.log('ID que se va a editar:', id);

        const updatedWarriorPowers = {
            new_power_id: document.getElementById('editNewPowerId').value
        };
        console.log('Datos enviados:', updatedWarriorPowers);

        try {

            const res = await fetch(`http://localhost:3000/warriorPowers/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedWarriorPowers)
            });

            if (res.ok) {
                fetchWarriorPowers();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editWarriorPowersModal')).hide();
            } else {
                console.error('Error al editar WarriorPowers');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteWarriorPowers = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este WarriorPowers?')) return;

        try {
            const res = await fetch(`http://localhost:3000/warriorPowers/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchWarriorPowers();
            } else {
                console.error('Error al eliminar WarriorPowers');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    //ver warrior Power
    window.showWarriorPowers = async function (id) {
    try {
        console.log("Obteniendo detalles del warrior Power con ID:", id);
        const res = await fetch(`http://localhost:3000/warriorPowers/${id}`);
        if (!res.ok) throw new Error("The warrior could not be retrieved.");
        const WarriorPowers = await res.json();
        const warriorPower = WarriorPowers[0]; // Accede al primer elemento
       

        // Asigna los datos al modal (usa exactamente los mismos nombres)
        
        document.getElementById("viewWarriorPowerWarriorId").textContent = warriorPower.warrior_id;
        document.getElementById("viewWarriorPowerPowerId").textContent = warriorPower.power_id;
        document.getElementById("viewWarriorPowerName").textContent = warriorPower.name;
        document.getElementById("viewWarriorPowerPercentage").textContent = warriorPower.percentage;
    

        // Muestra el modal
        document.activeElement.blur(); // evita error de aria-hidden
        const modal = new bootstrap.Modal(document.getElementById("viewWarriorPowerModal"));
        modal.show();
        } catch (error) {
            console.error("Error loading warrior Power details:", error);
            alert("There was a problem loading the warrior power details.");
        }
    };


    //Modal
    document.getElementById("createWarriorPowersForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const warrior_id = document.getElementById("createWarriorId").value.trim();
        const power_id = document.getElementById("createPowerId").value.trim();



        // Validación básica
        if (!warrior_id || !power_id) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/warriorPowers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    warrior_id,
                    power_id
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("WarriorPowers creado correctamente");
                document.getElementById("createWarriorPowersForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createWarriorPowersModal"));
                modal.hide();
                await fetchWarriorPowers(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un Power: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



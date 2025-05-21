document.addEventListener('DOMContentLoaded', () => {
    const PowersTableBody = document.getElementById('PowersTableBody');
    const editPowersForm = document.getElementById('editPowersForm');

    // Cargar perfiles al cargar la página
    fetchPowers();

    async function fetchPowers() {
        try {
            const res = await fetch('http://localhost:3000/powers');
            const data = await res.json();
            renderPowers(data);
        } catch (error) {
            console.error('Error al obtener Powers:', error);
        }
    }

    function renderPowers(Powers) {
        PowersTableBody.innerHTML = '';
        Powers.forEach(power => {
            PowersTableBody.innerHTML += `
          <tr>
            <td>${power.power_id}</td>
            <td>${power.name}</td>
            <td>${power.description}</td>
            <td>${power.percentage}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(power)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showPowers(${power.power_id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deletePowers(${power.power_id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (power) => {
        document.getElementById('editPowersId').value = power.power_id;
        document.getElementById('editPowersName').value = power.name;
        document.getElementById('editPowersDescription').value = power.description;
        document.getElementById('editPowersPercentage').value = power.percentage;
        const modal = new bootstrap.Modal(document.getElementById('editPowersModal'));
        modal.show();
    };

    // Enviar edición
    editPowersForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editPowersId').value;

        const updatedPowers = {
            name: document.getElementById('editPowersName').value,
            description: document.getElementById('editPowersDescription').value,
            percentage: document.getElementById('editPowersPercentage').value,
        };

        try {

            const res = await fetch(`http://localhost:3000/Powers/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPowers)
            });

            if (res.ok) {
                fetchPowers();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editPowersModal')).hide();
            } else {
                console.error('Error al editar Powers');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deletePowers = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este Powers?')) return;

        try {
            const res = await fetch(`http://localhost:3000/Powers/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchPowers();
            } else {
                console.error('Error al eliminar Powers');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    //ver detalles 
    window.showPowers= async function (id) {
    try {
        console.log("Obteniendo detalles del Powers con ID:", id);
        const res = await fetch(`http://localhost:3000/powers/${id}`);
        if (!res.ok) throw new Error("The warrior could not be retrieved.");
        const power = await res.json();
        
        // Asigna los datos al modal (usa exactamente los mismos nombres)
        document.getElementById("viewPowerId").textContent = power.power_id;
        document.getElementById("viewPowerName").textContent = power.name;
        document.getElementById("viewPowerDescription").textContent = power.description;
        document.getElementById("viewPowerPercentage").textContent = power.percentage;

        // Muestra el modal
        document.activeElement.blur(); // evita error de aria-hidden
        const modal = new bootstrap.Modal(document.getElementById("viewPowersModal"));
        modal.show();
        } catch (error) {
            console.error("Error loading power details:", error);
            alert("There was a problem loading the powers details.");
        }
    };


    //Modal
    document.getElementById("createPowersForm").addEventListener("submit", async function (e) {
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
            const response = await fetch("http://localhost:3000/Powers", {
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
                alert("Powers creado correctamente");
                document.getElementById("createPowersForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createPowersModal"));
                modal.hide();
                await fetchPowers(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un power: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



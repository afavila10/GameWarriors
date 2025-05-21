document.addEventListener('DOMContentLoaded', () => {
    const WarriorTypeTableBody = document.getElementById('WarriorTypeTableBody');
    const editWarriorTypeForm = document.getElementById('editWarriorTypeForm');

    // Cargar perfiles al cargar la página
    fetchWarriorType();

    async function fetchWarriorType() {
        try {
            const res = await fetch('http://localhost:3000/warrior_type');
            const data = await res.json();
            renderWarriorType(data);
        } catch (error) {
            console.error('Error al obtener WarriorType:', error);
        }
    }

    function renderWarriorType(WarriorType) {
        WarriorTypeTableBody.innerHTML = '';
        WarriorType.forEach(warriorType => {
            WarriorTypeTableBody.innerHTML += `
          <tr>
            <td>${warriorType.type_id}</td>
            <td>${warriorType.name}</td>
            <td>${warriorType.description}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(warriorType)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showWarriorType(${warriorType.type_id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteWarriorType(${warriorType.type_id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (warriorType) => {
        document.getElementById('editWarriorTypeId').value = warriorType.type_id;
        document.getElementById('editWarriorTypeName').value = warriorType.name;
        document.getElementById('editWarriorTypeDescription').value = warriorType.description;
        const modal = new bootstrap.Modal(document.getElementById('editWarriorTypeModal'));
        modal.show();
    };

    // Enviar edición
    editWarriorTypeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editWarriorTypeId').value;

        const updatedWarriorType = {
            name: document.getElementById('editWarriorTypeName').value,
            description: document.getElementById('editWarriorTypeDescription').value
        };

        try {

            const res = await fetch(`http://localhost:3000/warrior_type/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedWarriorType)
            });

            if (res.ok) {
                fetchWarriorType();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editWarriorTypeModal')).hide();
            } else {
                console.error('Error al editar WarriorType');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteWarriorType = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este WarriorType?')) return;

        try {
            const res = await fetch(`http://localhost:3000/warrior_type/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchWarriorType();
            } else {
                console.error('Error al eliminar WarriorType');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    //ver detalles 
    window.showWarriorType= async function (id) {
    try {
        console.log("Obteniendo detalles del warrior type con ID:", id);
        const res = await fetch(`http://localhost:3000/warrior_type/${id}`);
        if (!res.ok) throw new Error("The warrior could not be retrieved.");
        const WarriorType = await res.json();
        //const WarriorSpell = WarriorSpells[0]; // Accede al primer elemento
       

        // Asigna los datos al modal (usa exactamente los mismos nombres)
        document.getElementById("viewWarriorTypeId").textContent = WarriorType.type_id;
        document.getElementById("viewWarriorTypeName").textContent = WarriorType.name;
        document.getElementById("viewWarriorTypeDescription").textContent = WarriorType.description;

        // Muestra el modal
        document.activeElement.blur(); // evita error de aria-hidden
        const modal = new bootstrap.Modal(document.getElementById("viewWarriorTypeModal"));
        modal.show();
        } catch (error) {
            console.error("Error loading warrior details:", error);
            alert("There was a problem loading the warrior Type details.");
        }
    };

    //Modal
    document.getElementById("createWarriorTypeForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("createName").value.trim();
        const description = document.getElementById("createDescription").value.trim();


        // Validación básica
        if (!name || !description ) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/warrior_type", {
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
                alert("WarriorType creado correctamente");
                document.getElementById("createWarriorTypeForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createWarriorTypeModal"));
                modal.hide();
                await fetchWarriorType(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un spell: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



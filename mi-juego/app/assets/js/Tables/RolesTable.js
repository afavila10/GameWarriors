document.addEventListener('DOMContentLoaded', () => {
    const RolesTableBody = document.getElementById('RolesTableBody');
    const editRolesForm = document.getElementById('editRolesForm');

    // Cargar roles al cargar la página
    fetchRoles();

    async function fetchRoles() {
        try {
            const res = await fetch('http://localhost:3000/roles');
            const data = await res.json();
            renderRoles(data);
        } catch (error) {
            console.error('Error al obtener Roles:', error);
        }
    }

    function renderRoles(Roles) {
        RolesTableBody.innerHTML = '';
        Roles.forEach(Role => {
            RolesTableBody.innerHTML += `
          <tr>
            <td>${Role.id}</td>
            <td>${Role.name}</td>
            <td>${Role.description}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(Role)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showRoles(${Role.id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteRoles(${Role.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (Role) => {
        document.getElementById('editRolesId').value = Role.id;
        document.getElementById('editRolesName').value = Role.name;
        document.getElementById('editRolesDescription').value = Role.description;
        const modal = new bootstrap.Modal(document.getElementById('editRolesModal'));
        modal.show();
    };

    // Enviar edición
    editRolesForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editRolesId').value;

        const updatedRoles = {
            name: document.getElementById('editRolesName').value,
            description: document.getElementById('editRolesDescription').value
        };

        try {

            const res = await fetch(`http://localhost:3000/roles/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedRoles)
            });

            if (res.ok) {
                fetchRoles();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editRolesModal')).hide();
            } else {
                console.error('Error al editar Roles');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteRoles = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este Roles?')) return;

        try {
            const res = await fetch(`http://localhost:3000/roles/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchRoles();
            } else {
                console.error('Error al eliminar Roles');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };


    //ver detalles 
    window.showRoles= async function (id) {
    try {
        console.log("Obteniendo detalles de Roles con ID:", id);
        const res = await fetch(`http://localhost:3000/roles/${id}`);
        if (!res.ok) throw new Error("The warrior could not be retrieved.");
        const Role = await res.json();
        //const WarriorSpell = WarriorSpells[0]; // Accede al primer elemento
       

        // Asigna los datos al modal (usa exactamente los mismos nombres)
        document.getElementById("viewRoleId").textContent = Role.id;
        document.getElementById("viewRoleName").textContent = Role.name;
        document.getElementById("viewRoleDescription").textContent = Role.description;

        // Muestra el modal
        document.activeElement.blur(); // evita error de aria-hidden
        const modal = new bootstrap.Modal(document.getElementById("viewRoleModal"));
        modal.show();
        } catch (error) {
            console.error("Error loading Role details:", error);
            alert("There was a problem loading the Roles details.");
        }
    };

    //Modal
    document.getElementById("createRolesForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("createName").value.trim();
        const description = document.getElementById("createDescription").value.trim();


        // Validación básica
        if (!name || !description ) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/roles", {
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
                alert("Roles creado correctamente");
                document.getElementById("createRolesForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createRolesModal"));
                modal.hide();
                await fetchRoles(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un roles: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



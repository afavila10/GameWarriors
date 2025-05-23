document.addEventListener('DOMContentLoaded', () => {
    const PermissionsTableBody = document.getElementById('PermissionsTableBody');
    const editPermissionsForm = document.getElementById('editPermissionsForm');

    // Cargar Permissions al cargar la página
    fetchPermissions();

    async function fetchPermissions() {
        try {
            const res = await fetch('http://localhost:3000/permissions');
            const data = await res.json();
            renderPermissions(data);
        } catch (error) {
            console.error('Error al obtener Permissions:', error);
        }
    }

    function renderPermissions(Permissions) {
        PermissionsTableBody.innerHTML = '';
        Permissions.forEach(Permission => {
            PermissionsTableBody.innerHTML += `
          <tr>
            <td>${Permission.id}</td>
            <td>${Permission.name}</td>
            <td>${Permission.description}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(Permission)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showPermissions(${Permission.id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deletePermissions(${Permission.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (Permission) => {
        document.getElementById('editPermissionsId').value = Permission.id;
        document.getElementById('editPermissionsName').value = Permission.name;
        document.getElementById('editPermissionsDescription').value = Permission.description;
        const modal = new bootstrap.Modal(document.getElementById('editPermissionsModal'));
        modal.show();
    };

    // Enviar edición
    editPermissionsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editPermissionsId').value;

        const updatedPermissions = {
            name: document.getElementById('editPermissionsName').value,
            description: document.getElementById('editPermissionsDescription').value
        };

        try {

            const res = await fetch(`http://localhost:3000/permissions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPermissions)
            });

            if (res.ok) {
                fetchPermissions();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editPermissionsModal')).hide();
            } else {
                console.error('Error al editar Permissions');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deletePermissions = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este Permissions?')) return;

        try {
            const res = await fetch(`http://localhost:3000/permissions/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchPermissions();
            } else {
                console.error('Error al eliminar Permissions');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };


    //ver detalles 
    window.showPermissions= async function (id) {
    try {
        console.log("Obteniendo detalles de Permissions con ID:", id);
        const res = await fetch(`http://localhost:3000/permissions/${id}`);
        if (!res.ok) throw new Error("The warrior could not be retrieved.");
        const Permission = await res.json();
        //const WarriorSpell = WarriorSpells[0]; // Accede al primer elemento
       

        // Asigna los datos al modal (usa exactamente los mismos nombres)
        document.getElementById("viewPermissionId").textContent = Permission.id;
        document.getElementById("viewPermissionName").textContent = Permission.name;
        document.getElementById("viewPermissionDescription").textContent = Permission.description;

        // Muestra el modal
        document.activeElement.blur(); // evita error de aria-hidden
        const modal = new bootstrap.Modal(document.getElementById("viewPermissionModal"));
        modal.show();
        } catch (error) {
            console.error("Error loading Permission details:", error);
            alert("There was a problem loading the Permissions details.");
        }
    };

    //Modal
    document.getElementById("createPermissionsForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("createName").value.trim();
        const description = document.getElementById("createDescription").value.trim();


        // Validación básica
        if (!name || !description ) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/permissions", {
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
                alert("Permissions creado correctamente");
                document.getElementById("createPermissionsForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createPermissionsModal"));
                modal.hide();
                await fetchPermissions(); // Recarga la tabla 
            } else {
                alert("Error al crear un Permission: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



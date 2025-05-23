document.addEventListener('DOMContentLoaded', () => {
    const UserRolesTableBody = document.getElementById('UserRolesTableBody');
    const editUserRolesForm = document.getElementById('editUserRolesForm');

    // Cargar perfiles al cargar la página
    fetchUserRoles();

    async function fetchUserRoles() {
        try {
            const res = await fetch('http://localhost:3000/userRoles');
            const data = await res.json();
            renderUserRoles(data);
        } catch (error) {
            console.error('Error al obtener UserRoles:', error);
        }
    }

    function renderUserRoles(UserRoles) {
        UserRolesTableBody.innerHTML = '';
        UserRoles.forEach(UserRole => {
            UserRolesTableBody.innerHTML += `
          <tr>
            <td>${UserRole.id}</td>
            <td>${UserRole.user_id}</td>
            <td>${UserRole.role_id}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(UserRole)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showUserRoles(${UserRole.id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteUserRoles(${UserRole.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (UserRole) => {
        document.getElementById('editUserRoleId').value = UserRole.id;


        const modal = new bootstrap.Modal(document.getElementById('editUserRolesModal'));
        modal.show();
    };


    // Enviar edición
    editUserRolesForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editUserRoleId').value;
        console.log('ID que se va a editar:', id);

        const updatedUserRoles = {
            user_id: document.getElementById('editNewUserId').value,
            role_id: document.getElementById('editNewRoleId').value
        };
        console.log('Datos enviados:', updatedUserRoles);

        try {

            const res = await fetch(`http://localhost:3000/userRoles/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserRoles)
            });

            if (res.ok) {
                fetchUserRoles();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editUserRolesModal')).hide();
            } else {
                console.error('Error al editar UserRoles');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteUserRoles = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este UserRoles?')) return;

        try {
            const res = await fetch(`http://localhost:3000/userRoles/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchUserRoles();
            } else {
                console.error('Error al eliminar UserRoles');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    //ver user roles
    window.showUserRoles = async function (id) {
    try {
        console.log("Obteniendo detalles del warrior Power con ID:", id);
        const res = await fetch(`http://localhost:3000/userRoles/${id}`);
        if (!res.ok) throw new Error("The warrior could not be retrieved.");
        const UserRoles = await res.json();
        
        // Asigna los datos al modal (usa exactamente los mismos nombres)
        document.getElementById("viewUserRoleId").textContent = UserRoles.id;
        document.getElementById("viewUserRoleUserId").textContent = UserRoles.user_id;
        document.getElementById("viewUserRoleRoleId").textContent = UserRoles.role_id;
    
        // Muestra el modal
        document.activeElement.blur(); // evita error de aria-hidden
        const modal = new bootstrap.Modal(document.getElementById("viewUserRoleModal"));
        modal.show();
        } catch (error) {
            console.error("Error loading user role details:", error);
            alert("There was a problem loading the user role details.");
        }
    };


    //Modal
    document.getElementById("createUserRolesForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const user_id = document.getElementById("createUserId").value.trim();
        const role_id = document.getElementById("createRoleId").value.trim();



        // Validación básica
        if (!user_id || !role_id) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/userRoles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    user_id,
                    role_id
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("UserRoles creado correctamente");
                document.getElementById("createUserRolesForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createUserRolesModal"));
                modal.hide();
                await fetchUserRoles(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un Power: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



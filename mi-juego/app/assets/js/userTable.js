document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('userTableBody');
    const editUserForm = document.getElementById('editUserForm');

    // Cargar perfiles al cargar la página
    fetchUsers();

    async function fetchUsers() {
        try {
            const res = await fetch('http://localhost:3000/api/users');
            const data = await res.json();
            renderUser(data);
        } catch (error) {
            console.error('Error al obtener users:', error);
        }
    }

    function renderUser(users) {
        userTableBody.innerHTML = '';
        users.forEach(user => {
            userTableBody.innerHTML += `
          <tr>
            <td>${user.user_id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(user)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.user_id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (user) => {
        document.getElementById('editUserId').value = user.user_id;
        document.getElementById('editUserName').value = user.username;
        document.getElementById('editUserEmail').value = user.email;
        document.getElementById('editUserPassword').value = user.password;
        const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
        modal.show();
    };

    // Enviar edición
    editUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editUserId').value;

        const updatedUser = {
            username: document.getElementById('editUserName').value,
            email: document.getElementById('editUserEmail').value,
            password: document.getElementById('editUserPassword').value
        };

        try {

            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser)
            });

            if (res.ok) {
                fetchUsers();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editUserModal')).hide();
            } else {
                console.error('Error al editar user');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteUser = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este user?')) return;

        try {
            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchUsers();
            } else {
                console.error('Error al eliminar user');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    //Modal
    document.getElementById("createUserForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("createName").value.trim();
        const email = document.getElementById("createEmail").value.trim();
        const password = document.getElementById("createPassword").value.trim();
        // Validación básica
        if (!username || !email || !password) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("user creado correctamente");
                document.getElementById("createUserForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createUserModal"));
                modal.hide();
                await fetchUsers(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un user: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



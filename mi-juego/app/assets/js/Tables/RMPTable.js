document.addEventListener('DOMContentLoaded', () => {
    const RMPTableBody = document.getElementById('RMPTableBody');
    const editRMPForm = document.getElementById('editRMPForm');

    // Cargar Role modules Permissions a la pagina
    fetchRMP();

    async function fetchRMP() {
        try {
            const res = await fetch('http://localhost:3000/rmp');
            const data = await res.json();
            renderRMP(data);
        } catch (error) {
            console.error('Error al obtener RMP:', error);
        }
    }

    function renderRMP(RMP) {
        RMPTableBody.innerHTML = '';
        RMP.forEach(rmp => {
            RMPTableBody.innerHTML += `
          <tr>
            <td>${rmp.id}</td>
            <td>${rmp.role_id}</td>
            <td>${rmp.role_name}</td>
            <td>${rmp.module_id}</td>
            <td>${rmp.module_name}</td>
            <td>${rmp.permission_id}</td>
            <td>${rmp.permission_name}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(rmp)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showRMP(${rmp.id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteRMP(${rmp.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (rmp) => {
        document.getElementById('editRMPId').value = rmp.id;
        document.getElementById('editNewRoleId').value = rmp.role_id;
        document.getElementById('editNewModuleId').value = rmp.module_id;
        document.getElementById('editNewPermissionId').value = rmp.permission_id;
        const modal = new bootstrap.Modal(document.getElementById('editRMPModal'));
        modal.show();
    };


    // Enviar edición
    editRMPForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editRMPId').value;
        console.log('ID que se va a editar:', id);

        const updatedRMP = {
            role_id: document.getElementById('editNewRoleId').value,
            module_id: document.getElementById('editNewModuleId').value,
            permission_id: document.getElementById('editNewPermissionId').value
        };
        console.log('Datos enviados:', updatedRMP);

        try {
            const res = await fetch(`http://localhost:3000/rmp/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedRMP)
            });

            if (res.ok) {
                fetchRMP();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editRMPModal')).hide();
            } else {
                console.error('Error al editar RMP');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteRMP = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este RMP?')) return;

        try {
            const res = await fetch(`http://localhost:3000/rmp/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchRMP();
            } else {
                console.error('Error al eliminar RMP');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    //ver user RMP
    window.showRMP = async function (id) {
        try {
            console.log("Obteniendo detalles del warrior Power con ID:", id);
            const res = await fetch(`http://localhost:3000/rmp/${id}`);
            if (!res.ok) throw new Error("The warrior could not be retrieved.");
            const RMP = await res.json();

            // Asigna los datos al modal (usa exactamente los mismos nombres)
            document.getElementById("viewRMPId").textContent = RMP.id;
            document.getElementById("viewRMPRoleId").textContent = RMP.role_id;
            document.getElementById("viewRMPModuleId").textContent = RMP.module_id;
            document.getElementById("viewRMPPermissionId").textContent = RMP.permission_id;

            // Muestra el modal
            document.activeElement.blur(); // evita error de aria-hidden
            const modal = new bootstrap.Modal(document.getElementById("viewRMPModal"));
            modal.show();
        } catch (error) {
            console.error("Error loading Role Module Permission details:", error);
            alert("There was a problem loading the Role Module Permission  details.");
        }
    };


    //Modal
    document.getElementById("createRMPForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const role_id = document.getElementById("createRoleId").value.trim();
        const module_id = document.getElementById("createModuleId").value.trim();
        const permission_id = document.getElementById("createPermissionId").value.trim();

        // Validación básica
        if (!role_id || !module_id || !permission_id) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/rmp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    role_id,
                    module_id,
                    permission_id
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("RMP creado correctamente");
                document.getElementById("createRMPForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createRMPModal"));
                modal.hide();
                await fetchRMP(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un role module permission: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



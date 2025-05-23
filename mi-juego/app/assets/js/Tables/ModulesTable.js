document.addEventListener('DOMContentLoaded', () => {
    const ModulesTableBody = document.getElementById('ModulesTableBody');
    const editModulesForm = document.getElementById('editModulesForm');

    // Cargar modules al cargar la página
    fetchModules();

    async function fetchModules() {
        try {
            const res = await fetch('http://localhost:3000/modules');
            const data = await res.json();
            renderModules(data);
        } catch (error) {
            console.error('Error al obtener Modules:', error);
        }
    }

    function renderModules(Modules) {
        ModulesTableBody.innerHTML = '';
        Modules.forEach(Module => {
            ModulesTableBody.innerHTML += `
          <tr>
            <td>${Module.id}</td>
            <td>${Module.name}</td>
            <td>${Module.description}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(Module)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showModules(${Module.id})">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteModules(${Module.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (Module) => {
        document.getElementById('editModulesId').value = Module.id;
        document.getElementById('editModulesName').value = Module.name;
        document.getElementById('editModulesDescription').value = Module.description;
        const modal = new bootstrap.Modal(document.getElementById('editModulesModal'));
        modal.show();
    };

    // Enviar edición
    editModulesForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editModulesId').value;

        const updatedModules = {
            name: document.getElementById('editModulesName').value,
            description: document.getElementById('editModulesDescription').value
        };

        try {

            const res = await fetch(`http://localhost:3000/modules/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedModules)
            });

            if (res.ok) {
                fetchModules();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editModulesModal')).hide();
            } else {
                console.error('Error al editar Modules');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteModules = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este Modules?')) return;

        try {
            const res = await fetch(`http://localhost:3000/modules/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchModules();
            } else {
                console.error('Error al eliminar Modules');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };


    //ver detalles 
    window.showModules= async function (id) {
    try {
        console.log("Obteniendo detalles de Modules con ID:", id);
        const res = await fetch(`http://localhost:3000/Modules/${id}`);
        if (!res.ok) throw new Error("The warrior could not be retrieved.");
        const Module = await res.json();
        //const WarriorSpell = WarriorSpells[0]; // Accede al primer elemento
       

        // Asigna los datos al modal (usa exactamente los mismos nombres)
        document.getElementById("viewModuleId").textContent = Module.id;
        document.getElementById("viewModuleName").textContent = Module.name;
        document.getElementById("viewModuleDescription").textContent = Module.description;

        // Muestra el modal
        document.activeElement.blur(); // evita error de aria-hidden
        const modal = new bootstrap.Modal(document.getElementById("viewModuleModal"));
        modal.show();
        } catch (error) {
            console.error("Error loading Module details:", error);
            alert("There was a problem loading the Modules details.");
        }
    };

    //Modal
    document.getElementById("createModulesForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("createName").value.trim();
        const description = document.getElementById("createDescription").value.trim();


        // Validación básica
        if (!name || !description ) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/modules", {
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
                alert("Modules creado correctamente");
                document.getElementById("createModulesForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createModulesModal"));
                modal.hide();
                await fetchModules(); // Recarga la tabla 
            } else {
                alert("Error al crear un module: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



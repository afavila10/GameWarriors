document.addEventListener('DOMContentLoaded', () => {
    const MatchesTableBody = document.getElementById('MatchesTableBody');
    const editMatchesForm = document.getElementById('editMatchesForm');

    // al cargar la página aparecen en la tabla 
    fetchMatches();

    async function fetchMatches() {
        try {
            const res = await fetch('http://localhost:3000/partida');
            const data = await res.json();
            renderMatches(data);
        } catch (error) {
            console.error('Error al obtener Matches:', error);
        }
    }


    function renderMatches(matches) {
        MatchesTableBody.innerHTML = '';
        matches.forEach(matche => {
            MatchesTableBody.innerHTML += `
          <tr>
            <td>${matche.id}</td>
            <td>${matche.nombre}</td>
            <td>${matche.conectados}</td>
            <td>${matche.estado}</td>
            <td>${matche.creado_en}</td>

            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(matche)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteMatches(${matche.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (matches) => {
        document.getElementById('editMatchesId').value = matches.id;
        document.getElementById('editMatcheName').value = matches.nombre;
        document.getElementById('editMatcheConnected').value = matches.conectados;
        document.getElementById('editMatcheStatus').value = matches.estado;

        const modal = new bootstrap.Modal(document.getElementById('editMatchesModal'));
        modal.show();
    };

    // Enviar edición
    editMatchesForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('editMatchesId').value;
        console.log('el id que se va  enviar es '+ id);

        const updatedMatches = {
            nombre: document.getElementById('editMatcheName').value,
            conectados: document.getElementById('editMatcheConnected').value,
            estado: document.getElementById('editMatcheStatus').value,
            creado_en: document.getElementById('editMatcheCreateAt').value,
        };
        console.log('el datos para actualizar '+ updatedMatches);

        try {

            const res = await fetch(`http://localhost:3000/partida/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedMatches)
            });

            if (res.ok) {
                fetchMatches();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editMatchesModal')).hide();
            } else {
                console.error('Error al editar Matches');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteMatches = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este Matches?')) return;

        try {
            const res = await fetch(`http://localhost:3000/partida/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchMatches();
            } else {
                console.error('Error al eliminar Matches');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    //Modal
    document.getElementById("createMatchesForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const nombre = document.getElementById("createName").value.trim();
        const conectados = document.getElementById("createConnected").value.trim();
        const estado = document.getElementById("createStatus").value.trim();
        const creado_en = document.getElementById("createCreateAt").value.trim();
        

        
        // Validación básica
        if (!nombre|| !conectados|| !estado || !creado_en) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/partida", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    conectados,
                    estado,
                    creado_en
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("Matches creado correctamente");
                document.getElementById("createMatchesForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createMatchesModal"));
                modal.hide();
                await fetchMatches(); // Recarga la tabla con los perfiles actualizados
                  // <-- Agregado
            } else {
                alert("Error al crear un Matches: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



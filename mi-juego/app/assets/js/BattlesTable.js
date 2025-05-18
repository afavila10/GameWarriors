document.addEventListener('DOMContentLoaded', () => {
    const battlesTableBody = document.getElementById('battlesTableBody');
    const editBattlesForm = document.getElementById('editBattlesForm');

    // al cargar la página aparecen en la tabla 
    fetchBattles();

    async function fetchBattles() {
        try {
            const res = await fetch('http://localhost:3000/battles');
            const data = await res.json();
            renderBattles(data);
        } catch (error) {
            console.error('Error al obtener Battless:', error);
        }
    }


    function renderBattles(battles) {
        battlesTableBody.innerHTML = '';
        battles.forEach(battle => {
            battlesTableBody.innerHTML += `
          <tr>
            <td>${battle.id}</td>
            <td>${battle.warrior1_name}</td>
            <td>${battle.warrior2_name}</td>
            <td>${battle.winner_name}</td>
            <td>${battle.round}</td>

            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(battles)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteBattles(${battle.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
        });
    }

    // Abrir modal y rellenar datos
    window.openEditModal = (battles) => {
        document.getElementById('editBattlesId').value = battles.id;
        document.getElementById('editBattlesWarrior').value = battles.warrior1_name;
        document.getElementById('editBattlesWarrior2').value = battles.warrior2_name;
        document.getElementById('editBattlesWinner').value = battles.winner_name;
        document.getElementById('editBattlesRound').value = battles.round;

        const modal = new bootstrap.Modal(document.getElementById('editBattlesModal'));
        modal.show();
    };

    // Enviar edición
    editBattlesForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editBattlesId').value;

        const updatedBattles = {
            warrior1_name: document.getElementById('editBattlesWarrior').value,
            warrior2_name: document.getElementById('editBattlesWarrior2').value,
            winner_name: document.getElementById('editBattlesWinner').value,
            round: document.getElementById('editBattlesRound').value,
        };

        try {

            const res = await fetch(`http://localhost:3000/battles/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBattles)
            });

            if (res.ok) {
                fetchBattles();
                document.activeElement.blur(); // Elimina el foco del botón
                bootstrap.Modal.getInstance(document.getElementById('editBattlesModal')).hide();
            } else {
                console.error('Error al editar Battles');
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    });

    // Eliminar perfil
    window.deleteBattles = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este Battles?')) return;

        try {
            const res = await fetch(`http://localhost:3000/battles/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchBattles();
            } else {
                console.error('Error al eliminar Battles');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };

    //Modal
    document.getElementById("createBattlesForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const warrior1_name = document.getElementById("createName").value.trim();
        const warrior2_name = document.getElementById("createTotalPowers").value.trim();
        const winner_name = document.getElementById("createTotalMagic").value.trim();
        const round = document.getElementById("createHealth").value.trim();

        // Validación básica
        if (!warrior1_name || !warrior2_name || !winner_name || !round) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/battles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    warrior1_name,
                    warrior2_name,
                    winner_name,
                    round
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("Battles creado correctamente");
                document.getElementById("createBattlesForm").reset();
                document.activeElement.blur();
                const modal = bootstrap.Modal.getInstance(document.getElementById("createBattlesModal"));
                modal.hide();
                await fetchBattles(); // Recarga la tabla con los perfiles actualizados
            } else {
                alert("Error al crear un Battles: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});



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
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(battle)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-success btn-sm" onclick="showBattles(${battle.id})">
                <i class="fa-solid fa-eye"></i>
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
        document.getElementById('editBattlesRound').value = battles.round;
        document.getElementById('editBattlesWarrior').value = battles.warrior1_name;
        document.getElementById('editBattlesWarrior2').value = battles.warrior2_name;
        document.getElementById('editBattlesWinner').value = battles.winner_name;


        const modal = new bootstrap.Modal(document.getElementById('editBattlesModal'));
        modal.show();
    };

    // Enviar edición
    editBattlesForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('editBattlesId').value;
        console.log('el id que se va  enviar es ' + id);

        const updatedBattles = {
            warrior1_id: document.getElementById('editBattlesWarrior').value,
            warrior2_id: document.getElementById('editBattlesWarrior2').value,
            winner_id: document.getElementById('editBattlesWinner').value,
            round: document.getElementById('editBattlesRound').value,

        };
        console.log('el datos para actualizar ' + updatedBattles);

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

    //ver detalles 
    window.showBattles = async function (id) {
        try {
            console.log("Obteniendo detalles del Battles con ID:", id);
            const res = await fetch(`http://localhost:3000/battles/${id}`);
            if (!res.ok) throw new Error("The battle could not be retrieved.");
            const battle = await res.json();

            // Asigna los datos al modal (usa exactamente los mismos nombres)
            document.getElementById("viewBattleId").textContent = battle.id;
            document.getElementById("viewBattleRound").textContent = battle.round;
            document.getElementById("viewBattleWarrior1").textContent = battle.warrior1_name;
            document.getElementById("viewBattleWarrior2").textContent = battle.warrior2_name;
            document.getElementById("viewBattleWinner").textContent = battle.winner_name;


            // Muestra el modal
            document.activeElement.blur(); // evita error de aria-hidden
            const modal = new bootstrap.Modal(document.getElementById("viewBattlesModal"));
            modal.show();
        } catch (error) {
            console.error("Error loading battle details:", error);
            alert("There was a problem loading the battle details.");
        }
    };



    //Modal
    document.getElementById("createBattlesForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const warrior1_id = document.getElementById("createWarrior").value.trim();
        const warrior2_id = document.getElementById("createWarrior2").value.trim();
        const winner_id = document.getElementById("createWinner").value.trim();
        const round = document.getElementById("createRound").value.trim();


        // Validación básica
        if (!warrior1_id || !warrior2_id || !winner_id || !round) {
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
                    warrior1_id,
                    warrior2_id,
                    winner_id,
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
                // <-- Agregado
            } else {
                alert("Error al crear un Battles: " + result.error);
            }
        } catch (error) {
            alert("Error al conectar con el servidor: " + error.message);
        }
    });
});


